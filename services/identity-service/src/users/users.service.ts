import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserType } from '../entities/userType';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RoleResponseDto } from '../roles/dto/role-response.dto';
import { UserTypeResponseDto } from '../user-types/dto/user-type-response.dto';
import { ClubResponseDto } from '../clubs/dto/club-response.dto';
import bcrypt from 'bcrypt';

// Helper to map User entity to UserResponseDto
function toResponseDto(user: User): UserResponseDto {
  const role: RoleResponseDto = user.role
    ? {
        id: user.role.id,
        name: user.role.name,
        isActive: user.role.isActive,
      }
    : { id: '', name: '', isActive: false };
  const userType: UserTypeResponseDto = user.userType
    ? {
        id: user.userType.id,
        name: user.userType.name,
      }
    : { id: '', name: '' };
  const clubs: ClubResponseDto[] = user.userClubs && Array.isArray(user.userClubs)
    ? user.userClubs
        .map(uc =>
          uc.club
            ? {
                id: uc.club.id,
                name: uc.club.name,
                description: uc.club.description,
                address: uc.club.address,
                phone: uc.club.phone,
                logo: uc.club.logo,
                email: uc.club.email,
              } as ClubResponseDto
            : undefined,
        )
        .filter((c): c is ClubResponseDto => !!c)
    : [];
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    passwordHash: user.passwordHash,
    role,
    userType,
    clubs,

  };
}

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

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
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
      return toResponseDto(savedUser);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en create');
      throw error;
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.info('Inicio método findAll');
    try {
      const result = await this.userRepo.find({ relations: ['role', 'userType', 'userClubs', 'userClubs.club'] });
      this.logger.info('Usuarios obtenidos correctamente');
      this.logger.debug({ result }, 'Detalle de usuarios obtenidos');
      return result.map(user => toResponseDto(user));
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findAll');
      throw error;
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
    this.logger.info(`Inicio método findOne para id: ${id}`);
    try {
      const user = await this.userRepo.findOne({ where: { id }, relations: ['role', 'userType', 'userClubs', 'userClubs.club'] });
      if (!user) {
        this.logger.warn({ id }, 'Usuario no encontrado');
        throw new NotFoundException('Usuario no encontrado');
      }
      this.logger.info('Usuario obtenido correctamente');
      this.logger.debug({ user }, 'Detalle del usuario obtenido');
      return toResponseDto(user);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findOne');
      throw error;
    }
  }

  async findByEmailWithRole(email: string): Promise<UserResponseDto | null> {
    this.logger.info(`Inicio método findByEmailWithRole para email: ${email}`);
    try {
      const user = await this.userRepo.findOne({ where: { email }, relations: ['role', 'userType', 'userClubs', 'userClubs.club'] });
      this.logger.info('Usuario obtenido por email correctamente');
      this.logger.debug({ user }, 'Detalle del usuario por email');
      return user ? toResponseDto(user) : null;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en findByEmailWithRole');
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
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

  async remove(id: string): Promise<UserResponseDto> {
    this.logger.info(`Inicio método remove para id: ${id}`);
    try {
      const userEntity = await this.userRepo.findOne({ where: { id }, relations: ['role', 'userType', 'userClubs', 'userClubs.club'] });
      if (!userEntity) {
        this.logger.warn({ id }, 'Usuario no encontrado');
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.userRepo.remove(userEntity);
      this.rabbitClient.emit('user.deleted', { id: userEntity.id, email: userEntity.email });
      this.logger.info('Usuario eliminado correctamente');
      return toResponseDto(userEntity);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en remove');
      throw error;
    }
  }

  // Opcional: asignar rol por nombre
  async setRole(userId: string, roleName: string): Promise<UserResponseDto> {
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
      return toResponseDto(result);
    } catch (error: any) {
      this.logger.error({ error }, 'Error en setRole');
      throw error;
    }
  }
}
// End of UsersService
