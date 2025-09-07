import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from '../entities/sector.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepo: Repository<Sector>,
  ) {}

  async create(createSectorDto: CreateSectorDto) {
    const existingSector = await this.sectorRepo.findOneBy({
      name: createSectorDto.name,
    });
    if (existingSector) {
      throw new NotFoundException(
        `Sector con nombre ${createSectorDto.name} ya existe`,
      );
    }
    const sector = this.sectorRepo.create(createSectorDto);
    return this.sectorRepo.save(sector);
  }

  async findAll() {
    return this.sectorRepo.find();
  }

  async findOne(id: string) {
    const sector = await this.sectorRepo.findOneBy({ id });
    if (!sector) {
      throw new NotFoundException(`Sector con id ${id} no encontrado`);
    }
    return sector;
  }

  async update(id: string, updateSectorDto: UpdateSectorDto) {
    const sector = await this.sectorRepo.findOneBy({ id });
    if (!sector) {
      throw new NotFoundException(`Sector con id ${id} no encontrado`);
    }
    this.sectorRepo.merge(sector, updateSectorDto);
    return this.sectorRepo.save(sector);
  }

  async remove(id: string) {
    const sector = await this.sectorRepo.findOneBy({ id });
    if (!sector) {
      throw new NotFoundException(`Sector con id ${id} no encontrado`);
    }
    return await this.sectorRepo.remove(sector);
  }
}
