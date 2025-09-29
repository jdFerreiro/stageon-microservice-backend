import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from '../entities/function.entity';
import { FunctionStatus } from '../entities/function-status.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private readonly functionRepository: Repository<FunctionEntity>,
    @InjectRepository(FunctionStatus)
    private readonly functionStatusRepository: Repository<FunctionStatus>,
  ) {}

  async findByVenue(venueId: string): Promise<FunctionEntity[]> {
    return this.functionRepository.find({ where: { venueId }, relations: ['status'] });
  }

  async findAll(): Promise<FunctionEntity[]> {
    return this.functionRepository.find({ relations: ['status'] });
  }

  async findOne(id: string): Promise<FunctionEntity | null> {
    return this.functionRepository.findOne({ where: { id }, relations: ['status'] });
  }

  async create(data: Partial<FunctionEntity>): Promise<FunctionEntity> {
    const func = this.functionRepository.create(data);
    return this.functionRepository.save(func);
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
