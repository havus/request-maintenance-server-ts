import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'first_name' })
  firstName!: string;

  @Column('varchar', { name: 'last_name' })
  lastName?: string | null;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('varchar', { name: 'hash_password' })
  hashPassword!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
