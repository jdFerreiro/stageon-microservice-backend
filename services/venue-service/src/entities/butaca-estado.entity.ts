import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Butaca } from './butaca.entity';

@Entity()
export class ButacaStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  // Ej: "Disponible", "Reservada", "Bloqueada", "Fuera de servicio"

  @OneToMany(() => Butaca, (butaca) => butaca.status)
  butacas: Butaca[];
}
