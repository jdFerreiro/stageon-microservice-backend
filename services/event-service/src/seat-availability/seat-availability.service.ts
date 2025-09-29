import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatAvailability } from '../entities/seat-availability.entity';
import { SeatAvailabilityStatus } from '../entities/seat-availability-status.entity';

@Injectable()
export class SeatAvailabilityService {
  constructor(
    @InjectRepository(SeatAvailability)
    private readonly seatAvailabilityRepository: Repository<SeatAvailability>,
    @InjectRepository(SeatAvailabilityStatus)
    private readonly seatAvailabilityStatusRepository: Repository<SeatAvailabilityStatus>,
  ) {}

  async findAll(): Promise<SeatAvailability[]> {
    return this.seatAvailabilityRepository.find({ relations: ['status'] });
  }

  async findOne(id: string): Promise<SeatAvailability | null> {
    return this.seatAvailabilityRepository.findOne({ where: { id }, relations: ['status'] });
  }

  async create(data: Partial<SeatAvailability>): Promise<SeatAvailability> {
    const seat = this.seatAvailabilityRepository.create(data);
    return this.seatAvailabilityRepository.save(seat);
  }

  async update(id: string, data: Partial<SeatAvailability>): Promise<SeatAvailability | null> {
    await this.seatAvailabilityRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.seatAvailabilityRepository.delete(id);
  }

  async getStatuses(): Promise<SeatAvailabilityStatus[]> {
    return this.seatAvailabilityStatusRepository.find();
  }
}
