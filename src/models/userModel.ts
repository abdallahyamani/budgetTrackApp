import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generation function

export enum UserRole {
  customer = 'customer',
  admin = 'admin'
}

@Entity()
export class UserModel {

  @PrimaryGeneratedColumn()
  user_id: string

  // Generate a UUID for user_id before inserting into the database
  // @BeforeInsert()
  // generateUUID() {
  //   this.user_id = uuidv4();
  // }

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    // default: UserRole.customer
  })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
