import { DataSource } from 'typeorm';
import { Club } from '../club';
import { User } from '../user';
import { UserType } from '../userType';
import { Role } from '../role';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'stageon',
  entities: [User, UserType, Role, Club],
  synchronize: false,
});

export async function seedClubs() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Club);

  const clubs = [
    {
      name: 'Hermandad Gallega de Venezuela',
      description: 'Club social y deportivo de la comunidad gallega en Venezuela.',
      address: 'Av. Principal de Maripérez, Caracas, Venezuela',
      phone: '',
      email: '',
      logo: '',
    },
    {
      name: 'Centro Portugués',
      description: 'Centro social y deportivo de la comunidad portuguesa en Venezuela.',
      address: 'Av. Principal de Macaracuay, Caracas, Venezuela',
      phone: '',
      email: '',
      logo: '',
    },
    {
      name: 'Centro Italo Venezolano',
      description: 'Centro social y deportivo de la comunidad italo-venezolana en Venezuela.',
      address: 'Av. Principal de Prados del Este, Caracas, Venezuela',
      phone: '',
      email: '',
      logo: '',
    },
  ];

  for (const data of clubs) {
    let found = await repo.findOne({ where: { name: data.name } });
    if (!found) {
      const entity = repo.create(data);
      await repo.save(entity);
      console.log(`Club '${data.name}' creado.`);
    } else {
      console.log(`Club '${data.name}' ya existe.`);
    }
  }

  await AppDataSource.destroy();
}

if (require.main === module) {
  seedClubs().then(() => {
    console.log('Seed de clubs finalizado.');
    process.exit(0);
  }).catch(err => {
    console.error('Error en seedClubs:', err);
    process.exit(1);
  });
}
