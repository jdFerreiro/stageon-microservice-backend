import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserContext } from './User/user-context';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // clave compartida
      signOptions: { expiresIn: '60m' }, // opcional, aquí no sueles firmar tokens, solo validar
    }),
  ],
  providers: [JwtStrategy, UserContext],
  exports: [JwtStrategy, UserContext],
})
export class AuthModule {}
