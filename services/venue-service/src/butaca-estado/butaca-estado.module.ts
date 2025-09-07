import { Module } from '@nestjs/common';
import { ButacaEstadoService } from './butaca-estado.service';
import { ButacaEstadoController } from './butaca-estado.controller';

@Module({
  controllers: [ButacaEstadoController],
  providers: [ButacaEstadoService],
})
export class ButacaEstadoModule {}
