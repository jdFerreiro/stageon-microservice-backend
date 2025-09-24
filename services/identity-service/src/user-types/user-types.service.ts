import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserTypeResponseDto } from './dto/user-type-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../entities/userType';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,
  ) {}

  async create(data: CreateUserTypeDto): Promise<UserTypeResponseDto> {
    console.log(data);
    const exists = await this.userTypeRepo.findOne({ where: { name: data.name } });
    console.log(exists);
    if (exists) throw new BadRequestException('El tipo de usuario ya existe');
  const userType = this.userTypeRepo.create(data);
    const saved = await this.userTypeRepo.save(userType);
    return this.toResponseDto(saved);
  }

  async findAll(): Promise<UserTypeResponseDto[]> {
    const result = await this.userTypeRepo.find();
    return result.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<UserTypeResponseDto> {
    const userType = await this.userTypeRepo.findOne({ where: { id } });
    if (!userType) throw new NotFoundException('Tipo de usuario no encontrado');
    return this.toResponseDto(userType);
  }

  async update(id: string, data: UpdateUserTypeDto): Promise<UserTypeResponseDto> {
    const userTypeEntity = await this.userTypeRepo.findOne({ where: { id } });
    if (!userTypeEntity) throw new NotFoundException('Tipo de usuario no encontrado');
    Object.assign(userTypeEntity, data);
    const saved = await this.userTypeRepo.save(userTypeEntity);
    return this.toResponseDto(saved);
  }

  async remove(id: string): Promise<UserTypeResponseDto> {
    const userTypeEntity = await this.userTypeRepo.findOne({ where: { id } });
    if (!userTypeEntity) throw new NotFoundException('Tipo de usuario no encontrado');
    await this.userTypeRepo.remove(userTypeEntity);
    return this.toResponseDto(userTypeEntity);
  }
  private toResponseDto(userType: UserType): UserTypeResponseDto {
    return {
      id: userType.id,
      name: userType.name,
    };
  }
}
