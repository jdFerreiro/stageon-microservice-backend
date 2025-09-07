import { Module } from '@nestjs/common';
import { ButacaController } from './butaca.controller';
import { ButacaService } from './butaca.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Butaca } from '../entities/butaca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Butaca])],
  controllers: [ButacaController],
  providers: [ButacaService],
  exports: [ButacaService],
})
export class ButacaModule {}
