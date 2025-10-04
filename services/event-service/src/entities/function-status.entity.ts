import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('function_statuses')
export class FunctionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: 'scheduled', 'in_progress', 'finished', 'cancelled', etc.
}
