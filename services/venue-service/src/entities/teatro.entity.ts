import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sala } from './sala.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Teatro {
  @ApiProperty({ description: 'ID único del teatro', type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre del teatro', maxLength: 500 })
  @Column()
  @MaxLength(500)
  name: string;

  @ApiProperty({ description: 'Descripción del teatro', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Dirección del teatro' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Ciudad del teatro', maxLength: 500 })
  @Column()
  @MaxLength(500)
  city: string;

  @ApiProperty({ description: 'País del teatro', maxLength: 250 })
  @Column()
  @MaxLength(250)
  country: string;

  @ApiProperty({ description: 'Nombre del contacto', maxLength: 450 })
  @Column()
  @MaxLength(450)
  contactName: string;

  @ApiProperty({ description: 'Email del contacto', required: false, maxLength: 500 })
  @Column({ nullable: true })
  @MaxLength(500)
  contactEmail: string;

  @ApiProperty({ description: 'Teléfono del contacto', maxLength: 50 })
  @Column()
  @MaxLength(50)
  contactPhone: string;

  @ApiProperty({ description: 'Indica si el teatro está activo', default: true })
  @Column({ default: true })
  isactive: boolean;

  @ApiProperty({ description: 'ID del club asociado', type: 'string', format: 'uuid' })
  @Column({ type: 'uuid' })
  clubId: string;

  @OneToMany(() => Sala, (sala) => sala.teatro, { cascade: true })
  salas: Sala[];
}
