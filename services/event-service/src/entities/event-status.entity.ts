import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event_statuses')
export class EventStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ej: 'draft', 'published', 'cancelled', etc.

  @Column({ nullable: true })
  description?: string;
}
