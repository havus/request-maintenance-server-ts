import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  firstName!: string;

  @Column('varchar')
  lastName?: string | null;

  @Column('int')
  age!: number;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('varchar')
  hash_password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
