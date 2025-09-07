import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeatroModule } from './teatro/teatro.module';

@Module({
  imports: [TeatroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
