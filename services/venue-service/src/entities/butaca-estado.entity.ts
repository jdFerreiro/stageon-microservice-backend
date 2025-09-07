import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Butaca } from './butaca.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class ButacaStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @MaxLength(50)
  name: string;
  // Ej: "Disponible", "Reservada", "Bloqueada", "Fuera de servicio"

  @OneToMany(() => Butaca, (butaca) => butaca.status)
  butacas: Butaca[];
}
