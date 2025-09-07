import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectorEstadoDto } from './dto/create-sector-estado.dto';
import { UpdateSectorEstadoDto } from './dto/update-sector-estado.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorStatus } from '../entities/sector-estado.entity';

@Injectable()
export class SectorEstadoService {
  constructor(
    @InjectRepository(SectorStatus)
    private readonly repo: Repository<SectorStatus>,
  ) {}

  async create(createSectorEstadoDto: CreateSectorEstadoDto) {
    const existingSectorEstado = await this.repo.findOneBy({
      name: createSectorEstadoDto.name,
    });
    if (existingSectorEstado) {
      throw new NotFoundException(
        `Estado de sector con nombre ${createSectorEstadoDto.name} ya existe`,
      );
    }
    const sectorEstado = this.repo.create(createSectorEstadoDto);
    return this.repo.save(sectorEstado);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const sectorEstado = await this.repo.findOneBy({ id });
    if (!sectorEstado) {
      throw new NotFoundException(
        `Estado de sector con id ${id} no encontrado`,
      );
    }
    return sectorEstado;
  }

  async update(id: number, _updateSectorEstadoDto: UpdateSectorEstadoDto) {
    const sectorEstado = await this.repo.findOneBy({ id });
    if (!sectorEstado) {
      throw new NotFoundException(
        `Estado de sector con id ${id} no encontrado`,
      );
    }
    this.repo.merge(sectorEstado, _updateSectorEstadoDto);
    return this.repo.save(sectorEstado);
  }

  async remove(id: number) {
    const sectorEstado = await this.repo.findOneBy({ id });
    if (!sectorEstado) {
      throw new NotFoundException(
        `Estado de sector con id ${id} no encontrado`,
      );
    }
    return await this.repo.remove(sectorEstado);
  }
}
