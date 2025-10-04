import { DataSource } from 'typeorm';
import { eventStatusSeed } from './event-status.seed';
import { functionStatusSeed } from './function-status.seed';
import { reservationStatusSeed } from './reservation-status.seed';
import { seatAvailabilityStatusSeed } from './seat-availability-status.seed';
import { genreSeed } from './genre.seed';
import { EventStatus } from '../event-status.entity';
import { FunctionStatus } from '../function-status.entity';
import { ReservationStatus } from '../reservation-status.entity';
import { SeatAvailabilityStatus } from '../seat-availability-status.entity';
import { Genre } from '../genre.entity';

export async function runAllSeeds(dataSource: DataSource) {
  await dataSource.getRepository(EventStatus).save(eventStatusSeed);
  await dataSource.getRepository(FunctionStatus).save(functionStatusSeed);
  await dataSource.getRepository(ReservationStatus).save(reservationStatusSeed);
  await dataSource.getRepository(SeatAvailabilityStatus).save(seatAvailabilityStatusSeed);
  await dataSource.getRepository(Genre).save(genreSeed);
  console.log('Todos los seeds ejecutados correctamente');
}


import * as dotenv from 'dotenv';
import { Event } from '../event.entity';
dotenv.config();

if (require.main === module) {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_EVENTS_NAME,
    entities: [
      Event,
      EventStatus,
      FunctionStatus,
      ReservationStatus,
      SeatAvailabilityStatus,
      Genre,
    ],
    synchronize: false,
  });
  dataSource.initialize().then(async () => {
    await runAllSeeds(dataSource);
    await dataSource.destroy();
    process.exit(0);
  }).catch((err) => {
    console.error('Error inicializando DataSource:', err);
    process.exit(1);
  });
}
