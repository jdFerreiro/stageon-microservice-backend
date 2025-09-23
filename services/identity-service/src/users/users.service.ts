import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { Role } from '../entities/role';
import { UserType } from '../entities/userType';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(UserType)
    private readonly userTypeRepo: Repository<UserType>,
    @Inject('RABBITMQ_SERVICE')
    private readonly rabbitClient: ClientProxy,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async create(dto: CreateUserDto) {
    this.logger.info('Inicio método create');
    this.logger.debug({ dto }, 'Payload recibido en create');
    try {
      const existing = await this.userRepo.findOne({ where: { email: dto.email } });
      if (existing) {
        this.logger.warn({ email: dto.email }, 'Email ya registrado');
        throw new BadRequestException('El email ya está registrado');
      }
      const passwordHash = await bcrypt.hash(dto.password, 10);
      const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
      if (!role) {
        this.logger.error({ roleId: dto.roleId }, 'Rol no encontrado');
        throw new NotFoundException('Rol no encontrado');
      }
      const userType = await this.userTypeRepo.findOne({ where: { id: dto.userTypeId } });
      if (!userType) {
        this.logger.error({ userTypeId: dto.userTypeId }, 'Tipo de usuario no encontrado');
        throw new NotFoundException('Tipo de usuario no encontrado');
      }
      const user = this.userRepo.create({
        ...dto,
        passwordHash,
        role,
        userType,
      });
      const savedUser = await this.userRepo.save(user);
      this.rabbitClient.emit('user.created', { id: savedUser.id, email: savedUser.email });
      this.logger.info('Usuario creado correctamente');
      this.logger.debug({ savedUser }, 'Detalle del usuario creado');
      return savedUser;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en create');
      throw error;
    }
  }

  async findAll() {
    this.logger.info('Inicio método findAll');
    try {
      const result = await this.userRepo.find({ relations: ['role', 'userType'] });
      this.logger.info('Usuarios obtenidos correctamente');
      this.logger.debug({ result }, 'Detalle de usuarios obtenidos');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findAll');
      throw error;
    }
  }

  async findOne(id: string) {
    this.logger.info(`Inicio método findOne para id: ${id}`);
    try {
      const user = await this.userRepo.findOne({ where: { id }, relations: ['role', 'userType'] });
      if (!user) {
        this.logger.warn({ id }, 'Usuario no encontrado');
        throw new NotFoundException('Usuario no encontrado');
      }
      this.logger.info('Usuario obtenido correctamente');
      this.logger.debug({ user }, 'Detalle del usuario obtenido');
      return user;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findOne');
      throw error;
    }
  }

  async findByEmailWithRole(email: string) {
    this.logger.info(`Inicio método findByEmailWithRole para email: ${email}`);
    try {
      const user = await this.userRepo.findOne({ where: { email }, relations: ['role', 'userType'] });
      this.logger.info('Usuario obtenido por email correctamente');
      this.logger.debug({ user }, 'Detalle del usuario por email');
      return user;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findByEmailWithRole');
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    this.logger.info(`Inicio método update para id: ${id}`);
    this.logger.debug({ dto }, 'Payload recibido en update');
    try {
      const user = await this.findOne(id);
      if (dto.roleId) {
        const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
        if (!role) {
          this.logger.error({ roleId: dto.roleId }, 'Rol no encontrado');
          throw new NotFoundException('Rol no encontrado');
        }
        user.role = role;
      }
      if (dto.userTypeId) {
        const userType = await this.userTypeRepo.findOne({ where: { id: dto.userTypeId } });
        if (!userType) {
          this.logger.error({ userTypeId: dto.userTypeId }, 'Tipo de usuario no encontrado');
          throw new NotFoundException('Tipo de usuario no encontrado');
        }
        user.userType = userType;
      }
      Object.assign(user, dto);
      await this.userRepo.save(user);
      this.rabbitClient.emit('user.updated', { id: user.id, email: user.email });
      this.logger.info('Usuario actualizado correctamente');
      return this.findOne(id);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en update');
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.info(`Inicio método remove para id: ${id}`);
    try {
      const user = await this.findOne(id);
      const result = await this.userRepo.remove(user);
      this.rabbitClient.emit('user.deleted', { id: user.id, email: user.email });
      this.logger.info('Usuario eliminado correctamente');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en remove');
      throw error;
    }
  }

  // Opcional: asignar rol por nombre
  async setRole(userId: string, roleName: string) {
    this.logger.info(`Inicio método setRole para userId: ${userId}, roleName: ${roleName}`);
    try {
      const user = await this.findOne(userId);
      let role = await this.roleRepo.findOne({ where: { name: roleName } });
      if (!role) {
        role = await this.roleRepo.save({ name: roleName });
        this.logger.info({ role }, 'Nuevo rol creado');
      }
      user.role = role;
      const result = await this.userRepo.save(user);
      this.logger.info('Rol asignado correctamente');
      this.logger.debug({ result }, 'Detalle del usuario con nuevo rol');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en setRole');
      throw error;
    }
  }
}
