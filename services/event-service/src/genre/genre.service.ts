import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: string): Promise<Genre | null> {
    return this.genreRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Genre>): Promise<Genre> {
    const genre = this.genreRepository.create(data);
    return this.genreRepository.save(genre);
  }

  async update(id: string, data: Partial<Genre>): Promise<Genre | null> {
    await this.genreRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
