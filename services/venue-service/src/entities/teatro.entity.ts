import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sala } from './sala.entity';

@Entity()
export class Teatro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ nullable: true })
  contactInfo: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Sala, (sala) => sala.teatro, { cascade: true })
  salas: Sala[];
}
