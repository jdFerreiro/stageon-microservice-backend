import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reservation_statuses')
export class ReservationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: 'pending', 'confirmed', 'cancelled', 'expired', etc.
}
