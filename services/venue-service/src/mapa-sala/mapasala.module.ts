import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapaSalaService } from './mapasala.service';
import { MapaSalaController } from './mapasala.controller';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Sala } from '../entities/sala.entity';
import { JobsModule } from '../jobs/jobs.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapaSala, Sala]),
    JobsModule,
    BullModule.registerQueue({ name: 'mapa-sala' }),
  ],
  controllers: [MapaSalaController],
  providers: [MapaSalaService],
  exports: [MapaSalaService],
})
export class MapaSalaModule {}
