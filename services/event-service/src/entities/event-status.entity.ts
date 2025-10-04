import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event_statuses')
export class EventStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: 'draft', 'published', 'cancelled', etc.
}
