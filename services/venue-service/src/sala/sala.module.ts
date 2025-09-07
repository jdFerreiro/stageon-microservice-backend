import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { Sala } from '../entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sala])],
  controllers: [SalaController],
  providers: [SalaService],
  exports: [SalaService],
})
export class SalaModule {}
