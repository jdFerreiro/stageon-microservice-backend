import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
