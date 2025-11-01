import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapaSalaProcessor } from './mapa-sala.processor';
import { Sector } from '../entities/sector.entity';
import { Butaca } from '../entities/butaca.entity';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Sala } from '../entities/sala.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sector, Butaca, MapaSala, Sala]),
    BullModule.forRoot({
      connection: {
        host: '172.22.182.198', // IP del servidor WSL
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mapa-sala',
    }),
  ],
  providers: [MapaSalaProcessor],
  exports: [],
})
export class JobsModule {}
