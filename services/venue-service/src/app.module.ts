import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TeatroModule } from './teatro/teatro.module';
import { ButacaEstadoModule } from './butaca-estado/butaca-estado.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeatroController } from './teatro/teatro.controller';
import { ButacaModule } from './butaca/butaca.module';
import { SalaModule } from './sala/sala.module';
import { MapaSalaModule } from './mapa-sala/mapasala.module';
import { SectorModule } from './sector/sector.module';
import { SectorEstadoModule } from './sector-estado/sector-estado.module';
import { ButacaController } from './butaca/butaca.controller';
import { ButacaEstadoController } from './butaca-estado/butaca-estado.controller';
import { MapaSalaController } from './mapa-sala/mapasala.controller';
import { SalaController } from './sala/sala.controller';
import { SectorController } from './sector/sector.controller';
import { SectorEstadoController } from './sector-estado/sector-estado.controller';

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
    MapaSalaModule,
    SalaModule,
    SectorModule,
    SectorEstadoModule,
  ],
  controllers: [
    ButacaEstadoController,
    SectorEstadoController,
    TeatroController,
    SalaController,
    MapaSalaController,
    SectorController,
    ButacaController,
  ],
  providers: [AppService],
})
export class AppModule {}
