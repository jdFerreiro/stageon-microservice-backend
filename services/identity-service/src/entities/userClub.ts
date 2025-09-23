import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user';
import { Club } from './club';

@Entity('users_clubs_clubs')
@Unique(['user', 'club'])
export class UserClub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.id, { eager: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Club, club => club.id, { eager: false, onDelete: 'CASCADE' })
  club: Club;

  @Column({ type: 'varchar', length: 50, nullable: true })
  memberNumber: string;
}
