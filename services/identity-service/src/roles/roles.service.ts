import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    const role = this.roleRepo.create({ ...dto });
    return this.roleRepo.save(role);
  }

  async findAll() {
    return this.roleRepo.find();
  }

  async findOne(id: string) {
    const user = await this.roleRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Rol no encontrado');
    return user;
  }

  async update(id: string, dto: UpdateRoleDto) {
    await this.roleRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.roleRepo.remove(user);
  }
}
