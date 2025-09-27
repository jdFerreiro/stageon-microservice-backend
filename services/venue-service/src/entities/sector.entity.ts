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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sector {
  @ApiProperty({ description: 'ID único del sector', type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Sala a la que pertenece el sector', type: () => Sala })
  @ManyToOne(() => Sala, (sala) => sala.sectores)
  sala: Sala;

  @ApiProperty({ description: 'Nombre del sector', maxLength: 50 })
  @Column()
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'Capacidad del sector', type: 'integer' })
  @Column({ type: 'int' })
  capacity: number;

  @ApiProperty({ description: 'Descripción del sector', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Precio del sector', type: 'number', format: 'decimal' })
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ description: 'Descuento del sector', type: 'number', format: 'decimal', required: false })
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: false })
  @IsOptional()
  discount?: number;

  @ApiProperty({ description: 'Estado del sector', type: () => SectorStatus })
  @ManyToOne(() => SectorStatus, (status) => status.sectores)
  status: SectorStatus;

  @ApiProperty({ description: 'Butacas del sector', type: () => [Butaca], required: false })
  @OneToMany(() => Butaca, (butaca) => butaca.sector, { cascade: true })
  butacas: Butaca[];
}
