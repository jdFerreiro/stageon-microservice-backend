import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from '../entities/function.entity';
import { FunctionStatus } from '../entities/function-status.entity';
import { toLocalISOString } from './date-utils';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private readonly functionRepository: Repository<FunctionEntity>,
    @InjectRepository(FunctionStatus)
    private readonly functionStatusRepository: Repository<FunctionStatus>,
  ) {}

  async findByVenue(venueId: string): Promise<FunctionEntity[]> {
    const functions = await this.functionRepository.find({ where: { venueId }, relations: ['status'] });
    
    return functions.map(f => ({
      ...f,
      startTime: f.startTime,
      endTime: f.endTime,
      preSaleStart: f.preSaleStart,
      preSaleEnd: f.preSaleEnd,
    }));
  }

  async findAll(): Promise<FunctionEntity[]> {
    const functions = await this.functionRepository.find({ relations: ['status'] });
    return functions.map(f => ({
      ...f,
      startTime: f.startTime,
      endTime: f.endTime,
      preSaleStart: f.preSaleStart,
      preSaleEnd: f.preSaleEnd,
    }));
  }

  async findOne(id: string): Promise<FunctionEntity | null> {
    const f = await this.functionRepository.findOne({ where: { id }, relations: ['status'] });
    if (!f) return null;
    return {
      ...f,
      startTime: f.startTime,
      endTime: f.endTime,
      preSaleStart: f.preSaleStart,
      preSaleEnd: f.preSaleEnd,
    };
  }

  async create(data: Partial<FunctionEntity>): Promise<FunctionEntity> {
    const func = this.functionRepository.create(data);
    const saved = await this.functionRepository.save(func);
    return {
      ...saved,
      startTime: saved.startTime,
      endTime: saved.endTime,
      preSaleStart: saved.preSaleStart,
      preSaleEnd: saved.preSaleEnd,
    };
  }

  async update(id: string, data: Partial<FunctionEntity>): Promise<FunctionEntity | null> {
    await this.functionRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.functionRepository.delete(id);
  }

  async getStatuses(): Promise<FunctionStatus[]> {
    return this.functionStatusRepository.find();
  }
}
