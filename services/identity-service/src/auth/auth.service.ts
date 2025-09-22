import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('RABBITMQ_SERVICE')
    private readonly rabbitClient: ClientProxy,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  // -------------------------
  // Registro de usuario
  // -------------------------
  async register(dto: CreateUserDto) {
    this.logger.info('Inicio método register');
    this.logger.debug({ dto }, 'Payload recibido en register');
    try {
      const user = await this.usersService.create(dto);
      this.logger.info('Usuario registrado correctamente');
      this.logger.debug({ user }, 'Detalle del usuario registrado');
      return user;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en register');
      throw error;
    }
  }

  // -------------------------
  // Login de usuario
  // -------------------------
  async login(dto: LoginDto) {
    this.logger.info('Inicio método login');
    this.logger.debug({ dto }, 'Payload recibido en login');
    try {
      const user = await this.usersService.findByEmailWithRole(dto.email);
      if (!user) {
        this.logger.warn({ email: dto.email }, 'Email no encontrado');
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }
      const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
      if (!isMatch) {
        this.logger.warn({ email: dto.email }, 'Contraseña incorrecta');
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }
      this.rabbitClient.emit('user.login', { id: user.id, email: user.email });
      this.logger.info('Usuario autenticado correctamente');
      this.logger.debug({ user }, 'Detalle del usuario autenticado');
      return this.generateJwt(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.role ? user.role.id : "" ,
        user.role ? user.role.name : "",
      );
    } catch (error: any) {
      this.logger.error({ error }, 'Error en login');
      throw error;
    }
  }

  // -------------------------
  // Generar JWT
  // -------------------------
  private generateJwt(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    roleId: string,
    roleName: string,
  ) {
    this.logger.info('Generando JWT');
    const payload = {
      sub: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      roleId: roleId,
      roleName: roleName,
    };
    this.logger.debug({ payload }, 'Payload JWT');
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
      }),
    };
  }
}
