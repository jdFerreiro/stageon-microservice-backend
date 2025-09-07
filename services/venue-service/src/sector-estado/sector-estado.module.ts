import { Module } from '@nestjs/common';
import { SectorEstadoService } from './sector-estado.service';
import { SectorEstadoController } from './sector-estado.controller';
import { SectorStatus } from 'src/entities/sector-estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SectorStatus])],
  controllers: [SectorEstadoController],
  providers: [SectorEstadoService],
  exports: [SectorEstadoService],
})
export class SectorEstadoModule {}
