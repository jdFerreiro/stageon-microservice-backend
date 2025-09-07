import { Module } from '@nestjs/common';
import { ButacaEstadoService } from './butaca-estado.service';
import { ButacaEstadoController } from './butaca-estado.controller';
import { ButacaStatus } from 'src/entities/butaca-estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ButacaStatus])],
  controllers: [ButacaEstadoController],
  providers: [ButacaEstadoService],
  exports: [ButacaEstadoService],
})
export class ButacaEstadoModule {}
