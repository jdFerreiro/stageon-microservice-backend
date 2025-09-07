import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class SectorStatus {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  @MaxLength(50)
  name: string;
  // Ej: "Activo", "Reservado", "Bloqueado"

  @OneToMany(() => Sector, (sector) => sector.status)
  sectores: Sector[];
}
