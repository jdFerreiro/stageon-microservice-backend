import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
  // Login de usuario
  // -------------------------
  async login(dto: LoginDto) {
    // Buscar usuario por email con roles
    const user = await this.usersService.findByEmailWithRoles(dto.email);
    if (!user)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    // Validar contraseña
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch)
      throw new UnauthorizedException('Email o contraseña incorrectos');

    // Retornar token JWT
    return this.generateJwt(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.roles ? user.roles.map((r) => r.id) : [],
      user.roles ? user.roles.map((r) => r.name) : [],
    );
  }

  // -------------------------
  // Generar JWT
  // -------------------------
  private generateJwt(
    userId: string,
    email: string,
    firstname: string,
    lastname: string,
    roleIds: string[] = [],
    roleNames: string[] = [],
  ) {
    const payload = {
      sub: userId,
      email: email,
      firstName: firstname,
      lastName: lastname,
      roleIds: roleIds,
      roleNames: roleNames,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
      }),
    };
  }
}
