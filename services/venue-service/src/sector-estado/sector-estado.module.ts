import { Module } from '@nestjs/common';
import { SectorEstadoService } from './sector-estado.service';
import { SectorEstadoController } from './sector-estado.controller';
import { SectorStatus } from '../entities/sector-estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorStatusSeed } from '../entities/seeds/sector-estado.seed';

@Module({
  imports: [TypeOrmModule.forFeature([SectorStatus])],
  controllers: [SectorEstadoController],
  providers: [SectorEstadoService, SectorStatusSeed],
  exports: [SectorEstadoService, SectorStatusSeed],
})
export class SectorEstadoModule {}
