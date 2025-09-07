import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sala } from './sala.entity';
import { Butaca } from './butaca.entity';

@Entity()
export class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sala, (sala) => sala.sectores)
  sala: Sala;

  @Column()
  name: string;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  priceCategoryId: string; // referencia al pricing-service

  @OneToMany(() => Butaca, (butaca) => butaca.sector, { cascade: true })
  butacas: Butaca[];
}
