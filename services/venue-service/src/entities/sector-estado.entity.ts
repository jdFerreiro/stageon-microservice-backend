import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SectorStatus {
  @ApiProperty({ description: 'ID único del estado del sector', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Nombre del estado', example: 'Activo', maxLength: 50 })
  @Column()
  @MaxLength(50)
  name: string;
  // Ej: "Activo", "Reservado", "Bloqueado"

  @ApiProperty({ description: 'Sectores asociados a este estado', type: () => [Sector], required: false })
  @OneToMany(() => Sector, (sector) => sector.status)
  sectores: Sector[];
}
