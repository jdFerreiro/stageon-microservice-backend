import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorStatus } from '../sector-estado.entity';

@Injectable()
export class SectorStatusSeed {
  constructor(
    @InjectRepository(SectorStatus)
    private readonly sectorStatusRepository: Repository<SectorStatus>,
  ) {}

  async run() {
    const defaultStatuses = [
      {
        name: 'Disponible',
      },
      {
        name: 'Reservado',
      },
      {
        name: 'Bloqueado',
      },
      {
        name: 'Fuera de servicio',
      },
    ];

    for (const status of defaultStatuses) {
      const exists = await this.sectorStatusRepository.findOne({
        where: { name: status.name },
      });
      if (!exists) {
        await this.sectorStatusRepository.save(
          this.sectorStatusRepository.create(status),
        );
      }
    }

    console.log('✅ SectorStatus seed ejecutado correctamente');
  }
}
