import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from '../entities/userType';
import { UserTypesService } from './user-types.service';
import { UserTypesController } from './user-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  providers: [UserTypesService],
  controllers: [UserTypesController],
  exports: [UserTypesService],
})
export class UserTypesModule {}
