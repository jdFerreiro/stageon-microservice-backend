import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationStatus } from '../entities/reservation-status.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationStatus])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
