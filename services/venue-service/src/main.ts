import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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
  // Aumentar el límite de tamaño permitido para el cuerpo de la petición
  const express = require('express');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  // Habilitar CORS
  app.enableCors({
    origin: '*', // Cambia esto por el dominio que desees permitir en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Venue Service API')
    .setDescription('API documentation for Venue Service')
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
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 7020);
  console.log(`Venue Service running on port ${process.env.PORT || 7020}`);
}
void bootstrap();
