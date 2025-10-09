import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sala } from './sala.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MapaSala {
  @ApiProperty({ description: 'ID único del mapa de sala', type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Sala asociada al mapa', type: () => Sala })
  @ManyToOne(() => Sala, { eager: false })
  @JoinColumn({ name: 'salaId' })
  sala: Sala;

  @ApiProperty({ description: 'URL de la imagen del mapa', required: false, maxLength: 4294967295 })
  @Column({ nullable: true, type: 'longtext' })
  imageUrl: string;

  @ApiProperty({ description: 'Datos del mapa (coordenadas JSON/SVG de las butacas)', type: 'string', required: false, maxLength: 4294967295 })
  @Column({ type: 'longtext', nullable: true })
  mapData: string; // coordenadas JSON/SVG de las butacas

  @ApiProperty({ description: 'Versión del mapa', default: 1 })
  @Column({ default: 1 })
  version: number;
}
