import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { UserType } from './entities/userType';
import { Role } from './entities/role';
import { Club } from './entities/club';
import { UserClub } from './entities/userClub';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'stageon',
  entities: isProd
    ? ['dist/src/entities/*.js']
    : [User, UserType, Role, Club, UserClub],
  migrations: isProd
    ? ['dist/migrations/*.js']
    : ['src/migrations/*.ts'],
  synchronize: true, // <--- ACTIVADO para crear tabla intermedia automáticamente
});
