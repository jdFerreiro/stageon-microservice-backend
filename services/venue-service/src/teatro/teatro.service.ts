import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeatroDto } from './dto/create-teatro.dto';
import { UpdateTeatroDto } from './dto/update-teatro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teatro } from 'src/entities/teatro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeatroService {
  constructor(
    @InjectRepository(Teatro)
    private readonly teatroRepo: Repository<Teatro>,
  ) {}

  async create(createTeatroDto: CreateTeatroDto) {
    const teatro = this.teatroRepo.create(createTeatroDto);
    return this.teatroRepo.save(teatro);
  }

  findAll() {
    return this.teatroRepo.find();
  }

  async findOne(id: string) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro with id ${id} not found`);
    }
    return teatro;
  }

  async update(id: string, updateTeatroDto: UpdateTeatroDto) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro with id ${id} not found`);
    }
    this.teatroRepo.merge(teatro, updateTeatroDto);
    return this.teatroRepo.save(teatro);
  }

  async remove(id: string) {
    const teatro = await this.teatroRepo.findOneBy({ id });
    if (!teatro) {
      throw new NotFoundException(`Teatro with id ${id} not found`);
    }
    return await this.teatroRepo.remove(teatro);
  }
}
