import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Butaca } from './butaca.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ButacaStatus {
  @ApiProperty({ description: 'ID único del estado de la butaca', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Nombre del estado', example: 'Disponible', maxLength: 50 })
  @Column()
  @MaxLength(50)
  name: string;
  // Ej: "Disponible", "Reservada", "Bloqueada", "Fuera de servicio"

  @ApiProperty({ description: 'Butacas asociadas a este estado', type: () => [Butaca], required: false })
  @OneToMany(() => Butaca, (butaca) => butaca.status)
  butacas: Butaca[];
}
