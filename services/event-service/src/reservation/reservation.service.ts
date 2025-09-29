import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationStatus } from '../entities/reservation-status.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationStatus)
    private readonly reservationStatusRepository: Repository<ReservationStatus>,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({ relations: ['status'] });
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationRepository.findOne({ where: { id }, relations: ['status'] });
  }

  async create(data: Partial<Reservation>): Promise<Reservation> {
    const reservation = this.reservationRepository.create(data);
    return this.reservationRepository.save(reservation);
  }

  async update(id: string, data: Partial<Reservation>): Promise<Reservation | null> {
    await this.reservationRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }

  async getStatuses(): Promise<ReservationStatus[]> {
    return this.reservationStatusRepository.find();
  }
}
