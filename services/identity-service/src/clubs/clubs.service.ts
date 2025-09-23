import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../entities/club';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  async create(data: Partial<Club>) {
    const exists = await this.clubRepo.findOne({ where: { name: data.name } });
    if (exists) throw new BadRequestException('El club ya existe');
    const club = this.clubRepo.create(data);
    return this.clubRepo.save(club);
  }

  async findAll() {
    return this.clubRepo.find();
  }

  async findOne(id: string) {
    const club = await this.clubRepo.findOne({ where: { id } });
    if (!club) throw new NotFoundException('Club no encontrado');
    return club;
  }

  async update(id: string, data: Partial<Club>) {
    const club = await this.findOne(id);
    Object.assign(club, data);
    return this.clubRepo.save(club);
  }

  async remove(id: string) {
    const club = await this.findOne(id);
    return this.clubRepo.remove(club);
  }
}
