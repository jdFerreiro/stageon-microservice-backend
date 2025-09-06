import { Injectable, NotFoundException } from '@nestjs/common';
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
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, passwordHash });
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.userRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }

  // Opcional: asignar rol
  async addRole(userId: string, roleName: string) {
    const user = await this.findOne(userId);
    let role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) role = await this.roleRepo.save({ name: roleName });
    user.roles.push(role);
    return this.userRepo.save(user);
  }
}
