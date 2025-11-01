import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from '../entities/sector.entity';
import { Butaca } from '../entities/butaca.entity';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Sala } from '../entities/sala.entity';
import { Injectable, Logger } from '@nestjs/common';

@Processor('mapa-sala')
@Injectable()
export class MapaSalaProcessor extends WorkerHost {
  private readonly logger = new Logger(MapaSalaProcessor.name);

  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepo: Repository<Sector>,
    @InjectRepository(Butaca)
    private readonly butacaRepo: Repository<Butaca>,
    @InjectRepository(MapaSala)
    private readonly mapaSalaRepo: Repository<MapaSala>,
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {
    super();
  }

  async process(job: Job) {
    this.logger.log(`Job recibido: ${JSON.stringify(job.data)}`);
    const { mapaSalaId, base64 } = job.data;
    try {
      // 1. Obtener el mapa de sala y la sala asociada
      const mapaSala = await this.mapaSalaRepo.findOne({ where: { id: mapaSalaId }, relations: ['sala'] });
      if (!mapaSala) {
        this.logger.error(`MapaSala no encontrado: ${mapaSalaId}`);
        return false;
      }
      const salaId = mapaSala.sala.id;
      this.logger.log(`Procesando sala: ${salaId}`);

      // 2. Eliminar sectores y butacas existentes de la sala
      const sectores = await this.sectorRepo.find({ where: { sala: { id: salaId } }, relations: ['butacas'] });
      for (const sector of sectores) {
        if (sector.butacas && sector.butacas.length) {
          for (const butaca of sector.butacas) {
            await this.butacaRepo.delete(butaca.id);
            this.logger.log(`Butaca eliminada: ${butaca.id}`);
          }
        }
        await this.sectorRepo.delete(sector.id);
        this.logger.log(`Sector eliminado: ${sector.id}`);
      }

      // 3. Procesar el string base64 para obtener los datos del mapa
      let decoded;
      try {
        const base64Data = base64.split(',')[1] || base64;
        const jsonStr = Buffer.from(base64Data, 'base64').toString('utf8');
        decoded = JSON.parse(jsonStr);
      } catch (e) {
        this.logger.error(`Error decodificando base64: ${e}`);
        return false;
      }

      if (!decoded || !decoded.sectores) {
        this.logger.error('No se encontraron sectores en el mapa.');
        return false;
      }

      // 4. Crear sectores y butacas
      for (const sectorData of decoded.sectores) {
        const sector = this.sectorRepo.create({
          sala: { id: salaId },
          name: sectorData.name,
          description: sectorData.description,
          price: sectorData.price,
          discount: sectorData.discount,
          statusId: sectorData.statusId,
          capacity: sectorData.capacity,
        });
        const savedSector = await this.sectorRepo.save(sector);
        this.logger.log(`Sector creado: ${savedSector.id} (${savedSector.name})`);
        if (sectorData.butacas && Array.isArray(sectorData.butacas)) {
          for (const butacaData of sectorData.butacas) {
            const butaca = this.butacaRepo.create({
              sector: { id: savedSector.id },
              row: butacaData.row,
              number: butacaData.number,
              pos_x: butacaData.pos_x,
              pos_y: butacaData.pos_y,
              status: butacaData.statusId ? { id: butacaData.statusId } : undefined,
            });
            const savedButaca = await this.butacaRepo.save(butaca);
            this.logger.log(`Butaca creada: ${savedButaca.id} (Sector: ${savedSector.id}, Fila: ${savedButaca.row}, Número: ${savedButaca.number})`);
          }
        }
      }
      this.logger.log('Job completado correctamente.');
      return true;
    } catch (err) {
      this.logger.error(`Error en el procesamiento del job: ${err}`);
      return false;
    }
  }
}
