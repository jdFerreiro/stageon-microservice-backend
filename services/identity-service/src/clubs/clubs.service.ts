import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ClubResponseDto } from './dto/club-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../entities/club';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  async create(data: CreateClubDto): Promise<ClubResponseDto> {
    const exists = await this.clubRepo.findOne({ where: { name: data.name } });
    if (exists) throw new BadRequestException('El club ya existe');
    const club = this.clubRepo.create(data);
    const saved = await this.clubRepo.save(club);
    return this.toResponseDto(saved);
  }

  async findAll(): Promise<ClubResponseDto[]> {
    const result = await this.clubRepo.find();
    return result.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<ClubResponseDto> {
    const club = await this.clubRepo.findOne({ where: { id } });
    if (!club) throw new NotFoundException('Club no encontrado');
    return this.toResponseDto(club);
  }

  async update(id: string, data: UpdateClubDto): Promise<ClubResponseDto> {
    const clubEntity = await this.clubRepo.findOne({ where: { id } });
    if (!clubEntity) throw new NotFoundException('Club no encontrado');
    Object.assign(clubEntity, data);
    const saved = await this.clubRepo.save(clubEntity);
    return this.toResponseDto(saved);
  }

  async remove(id: string): Promise<ClubResponseDto> {
    const clubEntity = await this.clubRepo.findOne({ where: { id } });
    if (!clubEntity) throw new NotFoundException('Club no encontrado');
    await this.clubRepo.remove(clubEntity);
    return this.toResponseDto(clubEntity);
  }
  private toResponseDto(club: Club): ClubResponseDto {
    return {
      id: club.id,
      name: club.name,
      description: club.description,
      address: club.address,
      phone: club.phone,
      logo: club.logo,
      email: club.email,
    };
  }
}
