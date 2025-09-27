import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// Usar consola global para logs de depuración
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from './JwtPayload';

// Extend Express Request interface to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // No se usa logger inyectado, se usa consola global

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader =
      typeof request.headers['authorization'] === 'string'
        ? request.headers['authorization']
        : undefined;
    if (!authHeader) {
      console.warn('[JwtAuthGuard] No se encontró el header Authorization');
      return false;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.warn(`[JwtAuthGuard] Formato de Authorization inválido: ${authHeader}`);
      return false;
    }
    const token = parts[1];

    try {
      const payload: JwtPayload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
      console.info(`[JwtAuthGuard] Token válido para usuario: ${payload.email || payload.sub}`);
      return true;
    } catch (error) {
      console.error('[JwtAuthGuard] Error al verificar el token JWT:', error);
      return false;
    }
  }
}
