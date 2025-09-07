import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeatroDto } from './dto/create-teatro.dto';
import { UpdateTeatroDto } from './dto/update-teatro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teatro } from '../entities/teatro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeatroService {
  constructor(
    @InjectRepository(Teatro)
    private readonly teatroRepo: Repository<Teatro>,
  ) {}

  async create(createTeatroDto: CreateTeatroDto) {
    const existingTeatro = await this.teatroRepo.findOneBy({
      name: createTeatroDto.name,
    });
    if (existingTeatro) {
      throw new NotFoundException(
        `Teatro con nombre ${createTeatroDto.name} ya existe`,
      );
    }
    const teatro = this.teatroRepo.create(createTeatroDto);
    return this.teatroRepo.save(teatro);
  }

  async findAll() {
    return this.teatroRepo.find();
  }

  async findOne(id: string) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro con id ${id} no encontrado`);
    }
    return teatro;
  }

  async update(id: string, updateTeatroDto: UpdateTeatroDto) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro con id ${id} no encontrado`);
    }
    this.teatroRepo.merge(teatro, updateTeatroDto);
    return this.teatroRepo.save(teatro);
  }

  async remove(id: string) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro con id ${id} no encontrado`);
    }
    return await this.teatroRepo.remove(teatro);
  }
}
