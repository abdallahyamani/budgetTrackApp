import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { v4 as uuidv4 } from 'uuid'; // Import UUID generation function
import { UserModel } from "./userModel";
import { Enum } from "@tsed/schema";

// Define  enum for the categories Column
export enum Category {
  savings = "savings",
  college = "college",
  food = "food"
}
@Entity()
export class BudgetModel {

  @PrimaryGeneratedColumn()
  budget_id: string

  @Column({
    type: "enum",
    enum: Category
  })
  category: Category

  // @Enum(Category)
  // category : Category

  @Column()
  income: number

  @ManyToOne(() => UserModel, (user: UserModel) => user.user_id)
  @JoinColumn({ name: "user_id" })
  user: UserModel

  @Column()
  user_id: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

}
