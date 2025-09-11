import { DataSource } from 'typeorm';
import { User } from '../user';
import { Role } from '../role';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'stageon',
  entities: [User, Role],
  synchronize: false,
});

async function seedUsers() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const roles = await roleRepo.find();

  for (const role of roles) {
    const passwordHash = await bcrypt.hash('dummy123', 10);
    const dummyUser: Partial<User> = {
      firstName: `Dummy${role.name}`,
      lastName: `Example`,
      email: `dummy_${role.name.toLowerCase()}@example.com`,
      passwordHash,
      isActive: true,
      role: role,
    };
    let user = await userRepo.findOne({
      where: { email: dummyUser.email },
      relations: ['role'],
    });
    if (!user) {
      user = userRepo.create(dummyUser);
      await userRepo.save(user);
      console.log(`Usuario dummy creado para rol: ${role.name}`);
    } else {
      if (!user.role || user.role.id !== role.id) {
        user.role = role;
        await userRepo.save(user);
        console.log(`Rol ${role.name} asignado/actualizado a usuario dummy existente.`);
      } else {
        console.log(`Usuario dummy ya existe y tiene el rol: ${role.name}`);
      }
    }
  }
  await AppDataSource.destroy();
}

seedUsers()
  .then(() => {
    console.log('Seed de usuarios dummy finalizado');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error en el seed:', err);
    process.exit(1);
  });
