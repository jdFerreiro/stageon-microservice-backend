import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventStatus } from './event-status.entity';
import { Genre } from './genre.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Genre, { nullable: true })
  @JoinColumn({ name: 'genreId' })
  genre?: Genre;

  @Column({ type: 'uuid', nullable: true })
  genreId?: string;

  @Column({ type: 'int', nullable: true })
  durationMinutes?: number;

  @Column({ type: 'longtext', nullable: true })
  imageUrl?: string;

  @Column({ type: 'date', nullable: true })
  releaseDate?: Date;
  
  @Column({ type: 'int', nullable: true })
  statusId?: number;

  // Fechas para modelar fases especiales
  @Column({ type: 'timestamp', nullable: true })
  preSeasonStart?: Date; // Inicio de pre-temporada

  @Column({ type: 'timestamp', nullable: true })
  preSeasonEnd?: Date; // Fin de pre-temporada

  @Column({ type: 'timestamp', nullable: true })
  preSaleStart?: Date; // Inicio de pre-venta


  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  memberPrice?: number; // Precio para socios

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  nonMemberPrice?: number; // Precio para no socios

  @Column({ type: 'timestamp', nullable: true })
  preSaleEnd?: Date; // Fin de pre-venta

  @ManyToOne(() => EventStatus)
  @JoinColumn({ name: 'statusId' })
  status?: EventStatus;

  @Column({ type: 'uuid', nullable: true })
  clubId?: string;
}
