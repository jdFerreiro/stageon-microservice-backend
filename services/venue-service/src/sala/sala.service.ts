import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from '../entities/sala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto) {
    const existingSala = await this.salaRepo.findOneBy({
      name: createSalaDto.name,
    });
    if (existingSala) {
      throw new NotFoundException(
        `Sala con nombre ${createSalaDto.name} ya existe`,
      );
    }
    const sala = this.salaRepo.create(createSalaDto);
    return this.salaRepo.save(sala);
  }

  async findAll() {
    return this.salaRepo.find();
  }

  async findOne(id: string) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }
    return sala;
  }

  async update(id: string, updateSalaDto: UpdateSalaDto) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }
    this.salaRepo.merge(sala, updateSalaDto);
    return this.salaRepo.save(sala);
  }

  async remove(id: string) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }
    return await this.salaRepo.remove(sala);
  }
}
