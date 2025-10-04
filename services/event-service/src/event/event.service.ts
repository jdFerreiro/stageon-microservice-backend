import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { EventStatus } from '../entities/event-status.entity';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventStatus)
    private readonly eventStatusRepository: Repository<EventStatus>,
  ) {}

  // Métodos CRUD para Event
  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['status', 'genre'] });
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventRepository.findOne({ where: { id }, relations: ['status', 'genre'] });
  }

  async create(data: EventDto): Promise<Event> {
    const event = this.eventRepository.create(data);
    return this.eventRepository.save(event);
  }

  async update(id: string, data: EventDto): Promise<Event | null> {
    await this.eventRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }

  // Métodos para estatus
  async getStatuses(): Promise<EventStatus[]> {
    return this.eventStatusRepository.find();
  }
}
