import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sala } from './sala.entity';

@Entity()
export class MapaSala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sala)
  sala: Sala;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'json', nullable: true })
  mapData: any; // coordenadas JSON/SVG de las butacas

  @Column({ default: 1 })
  version: number;
}
