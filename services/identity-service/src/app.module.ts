import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Role } from './entities/role';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { UsersController } from './users/users.controller';
import { RoleController } from './roles/roles.controller';
import { ClubsModule } from './clubs/clubs.module';
import { Club } from './entities/club';
import { UserType } from './entities/userType';
import { UserTypesModule } from './user-types/user-types.module';
import { UserClubModule } from './user-club/user-club.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino/file',
          options: {
            destination: process.env.LOG_FILE_PATH || './logs/identity-service.log',
            mkdir: true,
            // Puedes agregar opciones de rotación con pino/file-rotate si lo deseas
          },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
          ],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '3600s',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
  entities: [User, Role, Club, UserType],
        synchronize: true, // ⚠️ solo en dev
      }),
    }),
  UsersModule,
  AuthModule,
  RolesModule,
  ClubsModule,
  UserTypesModule,
  UserClubModule,
  ],
  controllers: [AuthController, UsersController, RoleController],
})
export class AppModule {}
