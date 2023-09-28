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

  // @BeforeInsert()
  // async hashPassword() {
  //   // const scrypt = promisify(_scrypt);
  //   // const salt = randomBytes(8).toString('hex');
  //   // const hash = (await scrypt(this.password, salt, 64)) as Buffer;
  //   // this.password = salt + '.' + hash.toString('hex');
  // }

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

