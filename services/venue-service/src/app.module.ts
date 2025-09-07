import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeatroModule } from './teatro/teatro.module';
import { ButacaEstadoModule } from './butaca-estado/butaca-estado.module';

@Module({
  imports: [TeatroModule, ButacaEstadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
