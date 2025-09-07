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
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Identity Service API')
    .setDescription('API for managing identity-related entities')
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
      'jwt', // This name ('jwt') should match the one used in @ApiBearerAuth() decorator
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 7010);
  console.log(`Identity Service running on port ${process.env.PORT || 7010}`);
}
void bootstrap();
