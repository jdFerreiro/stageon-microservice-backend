import { DataSource } from 'typeorm';
import { User } from '../user';
import { UserType } from '../userType';
import { Role } from '../role';
import { Club } from '../club';
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
  entities: [User, UserType, Role, Club],
  synchronize: false,
});

async function seedUsers() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const userTypeRepo = AppDataSource.getRepository(UserType);
  const clubRepo = AppDataSource.getRepository(Club);

  // Buscar el userType 'socio' y el club 'Hermandad Gallega de Venezuela'
  const userTypeSocio = await userTypeRepo.findOne({ where: { name: 'socio' } });
  const clubHermandad = await clubRepo.findOne({ where: { name: 'Hermandad Gallega de Venezuela' } });
  if (!userTypeSocio) {
    throw new Error("No se encontró el UserType 'socio'");
  }
  if (!clubHermandad) {
    throw new Error("No se encontró el Club 'Hermandad Gallega de Venezuela'");
  }

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
      userType: userTypeSocio,
    };
    let user = await userRepo.findOne({
      where: { email: dummyUser.email },
      relations: ['role', 'userType'],
    });
    if (!user) {
      user = userRepo.create(dummyUser);
      await userRepo.save(user);
      // Relacionar usuario con el club en la tabla intermedia manualmente
      await AppDataSource.query(
        `INSERT IGNORE INTO users_clubs_clubs (usersId, clubsId) VALUES (?, ?);`,
        [user.id, clubHermandad.id]
      );
      console.log(`Usuario dummy creado para rol: ${role.name} y relacionado con el club.`);
    } else {
      let updated = false;
      if (!user.role || user.role.id !== role.id) {
        user.role = role;
        updated = true;
      }
      if (!user.userType || user.userType.id !== userTypeSocio.id) {
        user.userType = userTypeSocio;
        updated = true;
      }
      // Relacionar usuario con el club si no existe en la tabla intermedia
      const [rel] = await AppDataSource.query(
        `SELECT * FROM users_clubs_clubs WHERE usersId = ? AND clubsId = ?`,
        [user.id, clubHermandad.id]
      );
      if (!rel) {
        await AppDataSource.query(
          `INSERT INTO users_clubs_clubs (usersId, clubsId) VALUES (?, ?);`,
          [user.id, clubHermandad.id]
        );
        updated = true;
      }
      if (updated) {
        await userRepo.save(user);
        console.log(`Usuario dummy actualizado para rol: ${role.name} y relación club actualizada.`);
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
