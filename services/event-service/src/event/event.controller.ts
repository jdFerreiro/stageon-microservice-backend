import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '../entities/event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Event>): Promise<Event> {
    return this.eventService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Event>): Promise<Event | null> {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventService.remove(id);
  }

  @Get('/statuses/all')
  getStatuses() {
    return this.eventService.getStatuses();
  }
}
