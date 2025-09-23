import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';

@Entity('user_types')
export class UserType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Ej: 'socio', 'externo'

  @OneToMany(() => User, user => user.userType)
  users: User[];
}
