import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AppService.name);
  }

  getHello(): string {
    this.logger.info('Inicio método getHello');
    try {
      const result = 'Hello World!';
      this.logger.info('Finalización método getHello');
      this.logger.debug({ result }, 'Detalle del resultado de getHello');
      return result;
    } catch (error: any) {
      this.logger.error({ error }, 'Error en getHello');
      throw error;
    }
  }
}
