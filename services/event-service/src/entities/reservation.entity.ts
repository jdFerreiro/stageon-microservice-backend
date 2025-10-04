import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FunctionEntity } from './function.entity';
import { ReservationStatus } from './reservation-status.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  functionId: string; // Referencia a FunctionEntity

  @ManyToOne(() => FunctionEntity)
  @JoinColumn({ name: 'functionId' })
  functionEntity: FunctionEntity;

  @Column({ type: 'uuid' })
  seatId: string; // Referencia a la butaca (Venue Service)

  @Column({ type: 'uuid' })
  venueId: string; // Referencia a la sala (Venue Service)

  @Column( { type: 'uuid' })
  userId: string; // Referencia al usuario que reserva

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reservedAt: Date;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @Column({ type: 'int', nullable: true })
  statusId?: number;

  @ManyToOne(() => ReservationStatus)
  @JoinColumn({ name: 'statusId' })
  status?: ReservationStatus;
}
