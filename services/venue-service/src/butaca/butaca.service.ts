import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Butaca } from 'src/entities/butaca.entity';
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
    const butaca = this.repo.create(createButacaDto);
    return await this.repo.save(butaca);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const butaca = await this.repo.findOneBy({ id });
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
}
