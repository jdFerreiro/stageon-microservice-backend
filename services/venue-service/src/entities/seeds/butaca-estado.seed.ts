import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ButacaStatus } from '../butaca-estado.entity';

@Injectable()
export class ButacaStatusSeed {
  constructor(
    @InjectRepository(ButacaStatus)
    private readonly butacaStatusRepository: Repository<ButacaStatus>,
  ) {}

  async run() {
    const defaultStatuses = [
      {
        name: 'Disponible',
      },
      {
        name: 'Reservada',
      },
      {
        name: 'Bloqueada',
      },
      {
        name: 'Fuera de servicio',
      },
    ];

    for (const status of defaultStatuses) {
      const exists = await this.butacaStatusRepository.findOne({
        where: { name: status.name },
      });
      if (!exists) {
        await this.butacaStatusRepository.save(
          this.butacaStatusRepository.create(status),
        );
      }
    }

    console.log('✅ ButacaStatus seed ejecutado correctamente');
  }
}
