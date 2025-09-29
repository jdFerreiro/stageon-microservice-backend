import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reservation_statuses')
export class ReservationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ej: 'pending', 'confirmed', 'cancelled', 'expired', etc.

  @Column({ nullable: true })
  description?: string;
}
