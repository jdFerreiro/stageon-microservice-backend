import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { FunctionEntity } from './function.entity';
import { SeatAvailabilityStatus } from './seat-availability-status.entity';

@Entity('seat_availabilities')
export class SeatAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  seatId: string; // Referencia a la butaca (Venue Service)

  @Column({ type: 'uuid', nullable: true })
  eventId?: string;

  @ManyToOne(() => Event, { nullable: true })
  @JoinColumn({ name: 'eventId' })
  event?: Event;

  @Column({ type: 'uuid', nullable: true })
  functionId?: string;

  @ManyToOne(() => FunctionEntity, { nullable: true })
  @JoinColumn({ name: 'functionId' })
  functionEntity?: FunctionEntity;

  @Column({ type: 'int' })
  statusId: number;

  @ManyToOne(() => SeatAvailabilityStatus)
  @JoinColumn({ name: 'statusId' })
  status: SeatAvailabilityStatus;

  @Column({type: 'varchar', length: 255, nullable: true })
  reason?: string; // Motivo del bloqueo o restricción
}
