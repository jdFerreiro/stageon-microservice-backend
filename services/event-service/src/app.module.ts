
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { FunctionModule } from './function/function.module';
import { ReservationModule } from './reservation/reservation.module';
import { SeatAvailabilityModule } from './seat-availability/seat-availability.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { Event } from './entities/event.entity';
import { EventStatus } from './entities/event-status.entity';
import { FunctionEntity } from './entities/function.entity';
import { FunctionStatus } from './entities/function-status.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationStatus } from './entities/reservation-status.entity';
import { SeatAvailability } from './entities/seat-availability.entity';
import { SeatAvailabilityStatus } from './entities/seat-availability-status.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Conexión principal: stageon_events
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_EVENTS_NAME,
      entities: [
        Event,
        EventStatus,
        FunctionEntity,
        FunctionStatus,
        Reservation,
        ReservationStatus,
        SeatAvailability,
        SeatAvailabilityStatus,
      ],
      synchronize: true, // Solo para desarrollo
      autoLoadEntities: true,
    }),
    // Conexión para seguridad: stageon_identity
    TypeOrmModule.forRoot({
      name: 'identity',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_IDENTITY_NAME,
      entities: [], // Agrega aquí las entidades de identidad si las tienes
      synchronize: false,
      autoLoadEntities: false,
    }),
    // Conexión para venue: stageon_venue
    TypeOrmModule.forRoot({
      name: 'venue',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'stageon_venue',
      entities: [], // Agrega aquí las entidades de venue si las tienes
      synchronize: false,
      autoLoadEntities: false,
    }),
    EventModule,
    FunctionModule,
    ReservationModule,
    SeatAvailabilityModule,
  AuthModule,
  GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
