import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  log() {
    console.log(`Inserted New User ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User ${this.id}`);
  }
}

