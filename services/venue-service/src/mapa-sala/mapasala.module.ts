import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapaSalaService } from './mapasala.service';
import { MapaSalaController } from './mapasala.controller';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Sala } from '../entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapaSala, Sala])],
  controllers: [MapaSalaController],
  providers: [MapaSalaService],
  exports: [MapaSalaService],
})
export class MapaSalaModule {}
