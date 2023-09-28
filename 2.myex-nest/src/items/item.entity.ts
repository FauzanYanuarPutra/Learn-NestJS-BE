import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('item')
export class ItemSchema {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  category: string;
}