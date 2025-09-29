import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seat_availability_statuses')
export class SeatAvailabilityStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ej: 'available', 'blocked', 'reserved', 'not_for_sale', etc.

  @Column({ nullable: true })
  description?: string;
}
