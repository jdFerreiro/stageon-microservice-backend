import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { EventStatus } from '../entities/event-status.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventStatus])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
