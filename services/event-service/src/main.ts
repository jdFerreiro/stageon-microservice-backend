import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const httpsOptions: {
    pfx: Buffer;
    passphrase: string;
  } = {
    pfx: fs.readFileSync(process.env.PFX_PATH || 'dev.pfx'),
    passphrase: process.env.PFX_PASSPHRASE || '',
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  // Habilitar CORS
  app.enableCors({
    origin: '*', // Cambia esto por el dominio que desees permitir en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Events Service API')
    .setDescription('API documentation for Event Service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http' as const,
        scheme: 'bearer' as const,
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header' as const,
      },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Elimina propiedades no definidas en el DTO
      // forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Convierte tipos automáticamente
    }),
  );
  // Aumenta el límite del body parser a 10MB
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT || 7030);
  console.log(`Events Service running on port ${process.env.PORT || 7030}`);
}
bootstrap();
