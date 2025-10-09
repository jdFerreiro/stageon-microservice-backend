import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sector } from './sector.entity';
import { ButacaStatus } from './butaca-estado.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Butaca {
  @ApiProperty({ description: 'ID único de la butaca', type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Sector al que pertenece la butaca', type: () => Sector })
  @ManyToOne(() => Sector, (sector) => sector.butacas)
  sector: Sector;

  @ApiProperty({ description: 'Fila de la butaca', maxLength: 2 })
  @Column()
  @MaxLength(10)
  row: string;

  @ApiProperty({ description: 'Número de la butaca' })
  @Column()
  number: number;
    
  @ApiProperty({ description: 'Posición X' })
  @Column()
  pos_x: string;

  @ApiProperty({ description: 'Posición Y' })
  @Column()
  pos_y: string;

  @ApiProperty({ description: 'Estado de la butaca', type: () => ButacaStatus })
  @ManyToOne(() => ButacaStatus, (status) => status.butacas)
  status: ButacaStatus;
}
