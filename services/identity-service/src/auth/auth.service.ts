import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // -------------------------
  // Registro de usuario
  // -------------------------
  async register(dto: RegisterDto) {
    // Verificar si el email ya existe
    const existingUsers = await this.usersService.findAll();
    if (existingUsers.some((u) => u.email === dto.email)) {
      throw new BadRequestException('El email ya está registrado');
    }

    // Hashear password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Crear usuario en BD
    const createUserDto = {
      ...dto,
      password: passwordHash, // UsersService ya espera passwordHash
    };
    const user = await this.usersService.create(createUserDto);

    // Retornar token JWT
    return this.generateJwt(user.id, user.email, user.firstName, user.lastName);
  }

  // -------------------------
  // Login de usuario
  // -------------------------
  async login(dto: LoginDto) {
    // Buscar usuario por email
    const existingUsers = await this.usersService.findAll();
    const user = existingUsers.find((u) => u.email === dto.email);
    if (!user)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    // Validar contraseña
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    // Retornar token JWT
    return this.generateJwt(user.id, user.email, user.firstName, user.lastName);
  }

  // -------------------------
  // Generar JWT
  // -------------------------
  private generateJwt(
    userId: string,
    email: string,
    firstname: string,
    lastname: string,
  ) {
    const payload = {
      sub: userId,
      email: email,
      firstName: firstname,
      lastName: lastname,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
      }),
    };
  }
}
