import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  title!: string;

  @Column({ type: 'text' })
  description?: string | null;

  @Column({ type: 'int', default: 0 })
  status!: Number;

  @Column({ type: 'int', default: 0 })
  urgency!: Number;

  @Column('timestamp', { name: 'resolved_at' })
  resolvedAt?: Date | null;

  @Column('timestamp', { name: 'last_urgency_updated_at' })
  lastUrgencyUpdatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
