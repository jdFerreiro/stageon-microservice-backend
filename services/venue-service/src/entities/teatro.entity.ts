import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sala } from './sala.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Teatro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MaxLength(500)
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column()
  @MaxLength(500)
  city: string;

  @Column()
  @MaxLength(250)
  country: string;

  @Column()
  @MaxLength(450)
  contactName: string;

  @Column({ nullable: true })
  @MaxLength(500)
  contactEmail: string;

  @Column()
  @MaxLength(50)
  contactPhone: string;

  @Column({ default: true })
  isactive: boolean;

  @OneToMany(() => Sala, (sala) => sala.teatro, { cascade: true })
  salas: Sala[];
}
