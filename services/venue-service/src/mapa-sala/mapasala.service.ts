import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapaSalaDto } from './dto/create-mapasala.dto';
import { UpdateMapaSalaDto } from './dto/update-mapasala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MapaSala } from '../entities/mapa-sala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MapaSalaService {
  constructor(
    @InjectRepository(MapaSala)
    private readonly mapasalaRepo: Repository<MapaSala>,
  ) {}

  async create(createMapaSalaDto: CreateMapaSalaDto) {
    const mapasala = this.mapasalaRepo.create(createMapaSalaDto);
    return this.mapasalaRepo.save(mapasala);
  }

  async findAll() {
    return this.mapasalaRepo.find();
  }

  async findOne(id: string) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    return mapasala;
  }

  async update(id: string, updateMapaSalaDto: UpdateMapaSalaDto) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    this.mapasalaRepo.merge(mapasala, updateMapaSalaDto);
    return this.mapasalaRepo.save(mapasala);
  }

  async remove(id: string) {
    const mapasala = await this.mapasalaRepo.findOneBy({ id });
    if (!mapasala) {
      throw new NotFoundException(`MapaSala con id ${id} no encontrado`);
    }
    return await this.mapasalaRepo.remove(mapasala);
  }
}
