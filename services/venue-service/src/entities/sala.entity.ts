import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Teatro } from './teatro.entity';
import { Sector } from './sector.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sala {
  @ApiProperty({
    description: 'ID único de la sala',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre de la sala' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'ID del teatro al que pertenece',
    type: 'string',
    format: 'uuid',
  })
  @ManyToOne(() => Teatro, (teatro) => teatro.salas)
  teatro: Teatro;

  @OneToMany(() => Sector, (sector) => sector.sala)
  sectores: Sector[];
}
