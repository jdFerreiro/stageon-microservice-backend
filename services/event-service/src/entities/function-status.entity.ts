import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('function_statuses')
export class FunctionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ej: 'scheduled', 'in_progress', 'finished', 'cancelled', etc.

  @Column({ nullable: true })
  description?: string;
}
