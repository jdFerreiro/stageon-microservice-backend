import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateButacaEstadoDto } from './dto/create-butaca-estado.dto';
import { UpdateButacaEstadoDto } from './dto/update-butaca-estado.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ButacaStatus } from '../entities/butaca-estado.entity';

@Injectable()
export class ButacaEstadoService {
  constructor(
    @InjectRepository(ButacaStatus)
    private readonly repo: Repository<ButacaStatus>,
  ) {}

  async create(createButacaEstadoDto: CreateButacaEstadoDto) {
    const existingButacaEstado = await this.repo.findOneBy({
      name: createButacaEstadoDto.name,
    });
    if (existingButacaEstado) {
      throw new NotFoundException(
        `Estado de butaca con nombre ${createButacaEstadoDto.name} ya existe`,
      );
    }
    const butacaEstado = this.repo.create(createButacaEstadoDto);
    return this.repo.save(butacaEstado);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const butacaEstado = await this.repo.findOneBy({ id });
    if (!butacaEstado) {
      throw new NotFoundException(
        `Estado de butaca con id ${id} no encontrado`,
      );
    }
    return butacaEstado;
  }

  async update(id: number, _updateButacaEstadoDto: UpdateButacaEstadoDto) {
    const butacaEstado = await this.repo.findOneBy({ id });
    if (!butacaEstado) {
      throw new NotFoundException(
        `Estado de butaca con id ${id} no encontrado`,
      );
    }
    this.repo.merge(butacaEstado, _updateButacaEstadoDto);
    return this.repo.save(butacaEstado);
  }

  async remove(id: number) {
    const butacaEstado = await this.repo.findOneBy({ id });
    if (!butacaEstado) {
      throw new NotFoundException(
        `Estado de butaca con id ${id} no encontrado`,
      );
    }
    return await this.repo.remove(butacaEstado);
  }
}
