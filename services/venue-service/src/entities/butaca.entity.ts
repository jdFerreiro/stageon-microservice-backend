import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sector } from './sector.entity';
import { ButacaStatus } from './butaca-estado.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Butaca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sector, (sector) => sector.butacas)
  sector: Sector;

  @Column()
  @MaxLength(10)
  row: string;

  @Column()
  @MaxLength(10)
  number: string;

  @ManyToOne(() => ButacaStatus, (status) => status.butacas)
  status: ButacaStatus;
}
