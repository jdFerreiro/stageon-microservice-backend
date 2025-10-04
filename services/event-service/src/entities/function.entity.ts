import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { FunctionStatus } from './function-status.entity';

@Entity('functions')
export class FunctionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  eventId: string; // Referencia a Event

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column({ type: 'uuid' })
  venueId: string; // Referencia a la sala (Venue Service)

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  language?: string;

  @Column({ nullable: true })
  format?: string; // 2D, 3D, subtitulada, etc.
  @Column({ type: 'int', nullable: true })
  statusId?: number;

  // Fechas para modelar fases especiales en la función
  @Column({ type: 'timestamp', nullable: true })
  preSaleStart?: Date; // Inicio de pre-venta para la función

  @Column({ type: 'timestamp', nullable: true })
  preSaleEnd?: Date; // Fin de pre-venta para la función

  @ManyToOne(() => FunctionStatus)
  @JoinColumn({ name: 'statusId' })
  status?: FunctionStatus;
}
