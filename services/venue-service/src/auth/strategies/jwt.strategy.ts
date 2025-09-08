import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as PassportJwt from 'passport-jwt';
const ExtractJwt = PassportJwt.ExtractJwt;
import { UserContext } from '../User/user-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userContext: UserContext) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
    console.log('JWT Strategy initialized');
  }

  validate(payload: {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;
    roleIds: string[];
    roleNames: string[];
  }) {
    // Guardamos el payload en el objeto global
    this.userContext.setUser({
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roleIds: payload.roleIds,
      roleNames: payload.roleNames,
    });

    // req.user seguirá disponible también
    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roleIds: payload.roleIds,
      roleNames: payload.roleNames,
    };
  }
}
