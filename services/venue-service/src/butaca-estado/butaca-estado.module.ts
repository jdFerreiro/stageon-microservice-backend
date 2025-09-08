import { Module } from '@nestjs/common';
import { ButacaEstadoService } from './butaca-estado.service';
import { ButacaEstadoController } from './butaca-estado.controller';
import { ButacaStatus } from '../entities/butaca-estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ButacaStatusSeed } from '../entities/seeds/butaca-estado.seed';

@Module({
  imports: [TypeOrmModule.forFeature([ButacaStatus])],
  controllers: [ButacaEstadoController],
  providers: [ButacaEstadoService, ButacaStatusSeed],
  exports: [ButacaEstadoService, ButacaStatusSeed],
})
export class ButacaEstadoModule {}
