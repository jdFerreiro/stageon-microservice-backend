import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sala } from './sala.entity';
import { Butaca } from './butaca.entity';
import { IsOptional, MaxLength } from 'class-validator';
import { SectorStatus } from './sector-estado.entity';

@Entity()
export class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sala, (sala) => sala.sectores)
  sala: Sala;

  @Column()
  @MaxLength(50)
  name: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: false })
  @IsOptional()
  discount?: number;

  @ManyToOne(() => SectorStatus, (status) => status.sectores)
  status: SectorStatus;

  @OneToMany(() => Butaca, (butaca) => butaca.sector, { cascade: true })
  butacas: Butaca[];
}
