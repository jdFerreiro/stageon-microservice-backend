import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatAvailability } from '../entities/seat-availability.entity';
import { SeatAvailabilityStatus } from '../entities/seat-availability-status.entity';
import { SeatAvailabilityService } from './seat-availability.service';
import { SeatAvailabilityController } from './seat-availability.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeatAvailability, SeatAvailabilityStatus])],
  providers: [SeatAvailabilityService],
  controllers: [SeatAvailabilityController],
})
export class SeatAvailabilityModule {}
