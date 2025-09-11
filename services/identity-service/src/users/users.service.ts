import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { Role } from '../entities/role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role) 
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('El email ya está registrado');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
    if (!role) throw new NotFoundException('Rol no encontrado');
    const user = this.userRepo.create({
      ...dto,
      passwordHash,
      role,
    });
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findByEmailWithRole(email: string) {
    return this.userRepo.findOne({ where: { email }, relations: ['role'] });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.roleId) {
      const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
      if (!role) throw new NotFoundException('Rol no encontrado');
      user.role = role;
    }
    Object.assign(user, dto);
    await this.userRepo.save(user);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }

  // Opcional: asignar rol por nombre
  async setRole(userId: string, roleName: string) {
    const user = await this.findOne(userId);
    let role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) role = await this.roleRepo.save({ name: roleName });
    user.role = role;
    return this.userRepo.save(user);
  }
}
