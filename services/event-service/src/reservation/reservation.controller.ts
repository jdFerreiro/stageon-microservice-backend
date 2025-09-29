import { Entity } from 'typeorm';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from '../entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Reservation>): Promise<Reservation> {
    return this.reservationService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Reservation>): Promise<Reservation | null> {
    return this.reservationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reservationService.remove(id);
  }

  @Get('/statuses/all')
  getStatuses() {
    return this.reservationService.getStatuses();
  }
}
