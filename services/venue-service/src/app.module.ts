import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeatroModule } from './teatro/teatro.module';
import { ButacaEstadoModule } from './butaca-estado/butaca-estado.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeatroController } from './teatro/teatro.controller';
import { ButacaModule } from './butaca/butaca.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TeatroModule,
    ButacaEstadoModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_VENUE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TeatroModule,
    ButacaEstadoModule,
    ButacaModule,
  ],
  controllers: [TeatroController, AppController],
  providers: [AppService],
})
export class AppModule {}
