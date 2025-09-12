import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
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
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(RoleService.name);
  }

  async create(dto: CreateRoleDto) {
    this.logger.info('Inicio método create');
    this.logger.debug({ dto }, 'Payload recibido en create');
    try {
      const role = this.roleRepo.create({ ...dto });
      const savedRole = await this.roleRepo.save(role);
      this.logger.info('Rol creado correctamente');
      this.logger.debug({ savedRole }, 'Detalle del rol creado');
      return savedRole;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en create');
      throw error;
    }
  }

  async findAll() {
    this.logger.info('Inicio método findAll');
    try {
      const result = await this.roleRepo.find();
      this.logger.info('Roles obtenidos correctamente');
      this.logger.debug({ result }, 'Detalle de roles obtenidos');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findAll');
      throw error;
    }
  }

  async findOne(id: string) {
    this.logger.info(`Inicio método findOne para id: ${id}`);
    try {
      const role = await this.roleRepo.findOne({ where: { id } });
      if (!role) {
        this.logger.warn({ id }, 'Rol no encontrado');
        throw new NotFoundException('Rol no encontrado');
      }
      this.logger.info('Rol obtenido correctamente');
      this.logger.debug({ role }, 'Detalle del rol obtenido');
      return role;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findOne');
      throw error;
    }
  }

  async update(id: string, dto: UpdateRoleDto) {
    this.logger.info(`Inicio método update para id: ${id}`);
    this.logger.debug({ dto }, 'Payload recibido en update');
    try {
      await this.roleRepo.update(id, dto);
      this.logger.info('Rol actualizado correctamente');
      return this.findOne(id);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en update');
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.info(`Inicio método remove para id: ${id}`);
    try {
      const role = await this.findOne(id);
      const result = await this.roleRepo.remove(role);
      this.logger.info('Rol eliminado correctamente');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en remove');
      throw error;
    }
  }
}
