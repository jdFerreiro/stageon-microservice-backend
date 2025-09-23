import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from '../entities/userType';
import { UserTypesService } from './user-types.service';
import { UserTypesController } from './user-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserType]), AuthModule],
  providers: [UserTypesService],
  controllers: [UserTypesController],
  exports: [UserTypesService],
})
export class UserTypesModule {}
