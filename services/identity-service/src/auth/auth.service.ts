import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('RABBITMQ_SERVICE')
    private readonly rabbitClient: ClientProxy,
  ) {}
  
  // -------------------------
  // Login de usuario
  // -------------------------
  async login(dto: LoginDto) {
    // Buscar usuario por email con roles
    const user = await this.usersService.findByEmailWithRole(dto.email);
    if (!user)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    // Validar contraseña
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch)
      throw new UnauthorizedException('Email o contraseña incorrectos');


    // Enviar mensaje a RabbitMQ
    this.rabbitClient.emit('user.login', { id: user.id, email: user.email });

    // Retornar token JWT
    return this.generateJwt(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.role ? user.role.id : "" ,
      user.role ? user.role.name : "",
    );
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
    const payload = {
      sub: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      roleId: roleId,
      roleName: roleName,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
      }),
    };
  }
}
