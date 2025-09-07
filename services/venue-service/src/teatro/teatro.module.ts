import { Module } from '@nestjs/common';
import { TeatroService } from './teatro.service';
import { TeatroController } from './teatro.controller';

@Module({
  controllers: [TeatroController],
  providers: [TeatroService],
})
export class TeatroModule {}
