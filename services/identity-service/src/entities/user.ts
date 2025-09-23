import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role';
import { UserType } from './userType';
import { Club } from './club';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  role: Role;

  /**
   * Relación con el tipo de usuario (socio o externo)
   */
  @ManyToOne(() => UserType, userType => userType.users, { eager: true })
  userType: UserType;

  /**
   * Relación muchos a muchos con clubes
   */
  @ManyToMany(() => Club, club => club.users)
  @JoinTable({
    name: 'users_clubs_clubs',
    joinColumn: {
      name: 'usersId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'clubsId',
      referencedColumnName: 'id',
    },
  })
  clubs: Club[];
}
