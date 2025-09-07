import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sector } from './sector.entity';
import { ButacaStatus } from './butaca-estado.entity';

@Entity()
export class Butaca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sector, (sector) => sector.butacas)
  sector: Sector;

  @Column()
  row: string;

  @Column()
  number: string;

  @ManyToOne(() => ButacaStatus, (status) => status.butacas)
  status: ButacaStatus;

  @Column({ default: false })
  isAccessible: boolean;
}
