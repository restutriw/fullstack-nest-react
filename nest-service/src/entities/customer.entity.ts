import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  no: string;

  @Column()
  nama: string;

  @Column()
  alamat: string

  @Column()
  kota: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;

}