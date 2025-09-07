import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeatroService } from './teatro.service';
import { TeatroController } from './teatro.controller';
import { Teatro } from '../entities/teatro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teatro])],
  controllers: [TeatroController],
  providers: [TeatroService],
  exports: [TeatroService],
})
export class TeatroModule {}
