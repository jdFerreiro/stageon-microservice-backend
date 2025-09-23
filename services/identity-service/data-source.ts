import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/entities/user';
import { UserType } from './src/entities/userType';
import { Role } from './src/entities/role';
import { Club } from './src/entities/club';

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
    : [User, UserType, Role, Club],
  migrations: isProd
    ? ['dist/migrations/*.js']
    : ['src/migrations/*.ts'],
  synchronize: true, // <--- ACTIVADO para crear tabla intermedia automáticamente
});
