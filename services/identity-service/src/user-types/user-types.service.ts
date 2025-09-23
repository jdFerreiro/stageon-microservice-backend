import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../entities/userType';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,
  ) {}

  async create(data: Partial<UserType>) {
    const exists = await this.userTypeRepo.findOne({ where: { name: data.name } });
    if (exists) throw new BadRequestException('El tipo de usuario ya existe');
    const userType = this.userTypeRepo.create(data);
    return this.userTypeRepo.save(userType);
  }

  async findAll() {
    return this.userTypeRepo.find();
  }

  async findOne(id: string) {
    const userType = await this.userTypeRepo.findOne({ where: { id } });
    if (!userType) throw new NotFoundException('Tipo de usuario no encontrado');
    return userType;
  }

  async update(id: string, data: Partial<UserType>) {
    const userType = await this.findOne(id);
    Object.assign(userType, data);
    return this.userTypeRepo.save(userType);
  }

  async remove(id: string) {
    const userType = await this.findOne(id);
    return this.userTypeRepo.remove(userType);
  }
}
