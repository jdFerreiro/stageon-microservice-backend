import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';

import { UserClub } from './userClub';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, type: 'longtext' })
  logo: string; // Imagen en base64

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => UserClub, userClub => userClub.club)
  userClubs: UserClub[];
}
