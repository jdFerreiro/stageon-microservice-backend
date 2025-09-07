import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Teatro } from './teatro.entity';
import { Sector } from './sector.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Teatro, (teatro) => teatro.salas)
  teatro: Teatro;

  @Column()
  name: string;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Sector, (sector) => sector.sala, { cascade: true })
  sectores: Sector[];
}
