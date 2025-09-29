import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Butaca } from '../entities/butaca.entity';
import { Repository } from 'typeorm';
import { CreateButacaDto } from './dto/create-butaca.dto';
import { UpdateButacaDto } from './dto/update-butaca.dto';

@Injectable()
export class ButacaService {
  constructor(
    @InjectRepository(Butaca)
    private readonly repo: Repository<Butaca>,
  ) {}

  async create(createButacaDto: CreateButacaDto) {
    const butacaExists = await this.repo.findBy({
      row: createButacaDto.row,
      number: createButacaDto.number,
    });
    if (butacaExists.length) {
      throw new Error('Butaca already exists');
    }
    const butaca = this.repo.create({
      ...createButacaDto,
      sector: createButacaDto.sectorId ? { id: createButacaDto.sectorId } : undefined,
      status: createButacaDto.statusId ? { id: createButacaDto.statusId } : undefined,
    });
    return this.repo.save(butaca);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['status'],
    });
  }

  async findOne(id: string) {
    const butaca = await this.repo.findOne({
      where: { id },
      relations: ['status'],
    });
    if (!butaca) {
      throw new NotFoundException(`ButacaEstado with id ${id} not found`);
    }
    return butaca;
  }

  async update(id: string, updateButacaDto: UpdateButacaDto) {
    const butaca = await this.repo.findOneBy({ id });
    if (!butaca) {
      throw new NotFoundException(`Butaca with id ${id} not found`);
    }
    return this.repo.update(id, updateButacaDto);
  }

  async remove(id: string) {
    const butaca = await this.repo.findOneBy({ id });
    if (!butaca) {
      throw new NotFoundException(`Butaca with id ${id} not found`);
    }
    return this.repo.delete(id);
  }

  async findBySector(sectorId: string) {
    return this.repo.find({
      where: { sector: { id: sectorId } },
      relations: ['status'],
    });
  }
}
