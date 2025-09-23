import { DataSource } from 'typeorm';
import { Role } from '../role';
import { User } from '../user';
import { UserType } from '../userType';
import { Club } from '../club';
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

async function seedRoles() {
  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(Role);
  const roles = [
    { name: 'Administrador' },
    { name: 'Gerente' },
    { name: 'Usuario' },
  ];
  for (const r of roles) {
    const exists = await roleRepo.findOneBy({ name: r.name });
    if (!exists) {
      await roleRepo.save(roleRepo.create(r));
      console.log(`Rol creado: ${r.name}`);
    } else {
      console.log(`Rol ya existe: ${r.name}`);
    }
  }
  await AppDataSource.destroy();
}

seedRoles()
  .then(() => {
    console.log('Seed de roles finalizado');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error en el seed:', err);
    process.exit(1);
  });
