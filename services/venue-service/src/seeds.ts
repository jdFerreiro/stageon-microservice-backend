import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ButacaStatusSeed } from './entities/seeds/butaca-estado.seed';
import { SectorStatusSeed } from './entities/seeds/sector-estado.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedButaca = app.get(ButacaStatusSeed);
  await seedButaca.run();
  const seedSector = app.get(SectorStatusSeed);
  await seedSector.run();
  await app.close();
}
void bootstrap();
