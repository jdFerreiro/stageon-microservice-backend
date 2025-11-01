import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapaSalaDto } from './dto/create-mapasala.dto';
import { UpdateMapaSalaDto } from './dto/update-mapasala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Sala } from '../entities/sala.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MapaSalaService {
  constructor(
    @InjectRepository(MapaSala)
    private readonly mapasalaRepo: Repository<MapaSala>,
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
    @InjectQueue('mapa-sala')
    private readonly mapaSalaQueue: Queue,
  ) {}

  async create(createMapaSalaDto: CreateMapaSalaDto) {
    // Buscar la sala por su id
    const sala = await this.salaRepo.findOneBy({ id: createMapaSalaDto.salaId });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${createMapaSalaDto.salaId} no encontrada`);
    }
    // Crear el mapa de sala y asignar la sala
    const mapasala = this.mapasalaRepo.create({
      ...createMapaSalaDto,
      sala,
    });
    const savedMapaSala = await this.mapasalaRepo.save(mapasala);

    // Validar el contenido de mapData antes de lanzar el job
    try {
      const base64Data = createMapaSalaDto.mapData.split(',')[1] || createMapaSalaDto.mapData;
      console.log(createMapaSalaDto.mapData);
      const jsonStr = Buffer.from(base64Data, 'base64').toString('utf8');
      JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('El campo mapData no contiene un JSON válido en base64.');
    }

    // Lanzar el job en background para procesar el mapa
    await this.mapaSalaQueue.add('process', {
      mapaSalaId: savedMapaSala.id,
      base64: createMapaSalaDto.mapData,
    });
    return savedMapaSala;
  }

  async findAll() {
    return this.mapasalaRepo.find();
  }

  async findOne(id: string) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    return mapasala;
  }

  async update(id: string, updateMapaSalaDto: UpdateMapaSalaDto) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    this.mapasalaRepo.merge(mapasala, updateMapaSalaDto);
    return this.mapasalaRepo.save(mapasala);
  }

  async remove(id: string) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    return await this.mapasalaRepo.remove(mapasala);
  }

  async findBySala(salaId: string) {
    // Buscar todos los mapas que pertenecen a una sala específica
    return this.mapasalaRepo.find({ where: { sala: { id: salaId } } });
  }
}
