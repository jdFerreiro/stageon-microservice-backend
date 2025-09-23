import { DataSource } from 'typeorm';
import { UserType } from '../userType';
import { User } from '../user';
import { Role } from '../role';
import { Club } from '../club';
import { UserClub } from '../userClub';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'stageon',
  entities: [User, UserType, Role, Club, UserClub],
  synchronize: false,
});

export async function seedUserTypes() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(UserType);

  const userTypes = [
    { name: 'socio' },
    { name: 'externo' },
  ];

  for (const data of userTypes) {
    let found = await repo.findOne({ where: { name: data.name } });
    if (!found) {
      const entity = repo.create(data);
      await repo.save(entity);
      console.log(`UserType '${data.name}' creado.`);
    } else {
      console.log(`UserType '${data.name}' ya existe.`);
    }
  }

  await AppDataSource.destroy();
}

if (require.main === module) {
  seedUserTypes().then(() => {
    console.log('Seed de userTypes finalizado.');
    process.exit(0);
  }).catch(err => {
    console.error('Error en seedUserTypes:', err);
    process.exit(1);
  });
}
