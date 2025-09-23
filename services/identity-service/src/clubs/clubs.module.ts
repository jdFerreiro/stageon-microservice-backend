import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '../entities/club';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubsService],
  controllers: [ClubsController],
  exports: [ClubsService],
})
export class ClubsModule {}
