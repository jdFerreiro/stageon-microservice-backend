import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from '../entities/function.entity';
import { FunctionStatus } from '../entities/function-status.entity';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionEntity, FunctionStatus])],
  providers: [FunctionService],
  controllers: [FunctionController],
})
export class FunctionModule {}
