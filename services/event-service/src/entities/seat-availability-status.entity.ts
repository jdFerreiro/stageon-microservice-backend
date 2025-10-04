import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seat_availability_statuses')
export class SeatAvailabilityStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: 'available', 'blocked', 'reserved', 'not_for_sale', etc.
}
