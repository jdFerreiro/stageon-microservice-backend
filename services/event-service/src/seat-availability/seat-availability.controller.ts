import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SeatAvailabilityService } from './seat-availability.service';
import { SeatAvailability } from '../entities/seat-availability.entity';

@Controller('seat-availability')
export class SeatAvailabilityController {
  constructor(private readonly seatAvailabilityService: SeatAvailabilityService) {}

  @Get()
  findAll(): Promise<SeatAvailability[]> {
    return this.seatAvailabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SeatAvailability | null> {
    return this.seatAvailabilityService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<SeatAvailability>): Promise<SeatAvailability> {
    return this.seatAvailabilityService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<SeatAvailability>): Promise<SeatAvailability | null> {
    return this.seatAvailabilityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.seatAvailabilityService.remove(id);
  }

  @Get('/statuses/all')
  getStatuses() {
    return this.seatAvailabilityService.getStatuses();
  }
}
