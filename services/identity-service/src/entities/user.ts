import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './role';
import { UserType } from './userType';
import { UserClub } from './userClub';

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
   * Relación con UserClub para clubes y número de socio
   */
  @OneToMany(() => UserClub, userClub => userClub.user)
  userClubs: UserClub[];
}
