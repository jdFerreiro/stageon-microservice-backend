import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventStatus } from './event-status.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  durationMinutes?: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  posterImage?: string; // Imagen del póster en formato base64

  @Column({ nullable: true })
  type?: string; // Obra, Película, Concierto, etc.

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

  @Column({ type: 'timestamp', nullable: true })
  preSaleEnd?: Date; // Fin de pre-venta

  @ManyToOne(() => EventStatus)
  @JoinColumn({ name: 'statusId' })
  status?: EventStatus;
}
