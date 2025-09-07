import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Teatro } from './teatro.entity';
import { Sector } from './sector.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Teatro, (teatro) => teatro.salas)
  teatro: Teatro;

  @Column()
  @MaxLength(250)
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isactive: boolean;

  @OneToMany(() => Sector, (sector) => sector.sala, { cascade: true })
  sectores: Sector[];
}
