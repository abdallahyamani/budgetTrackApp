import { Property } from "@tsed/schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define  enum for the categories Column
export enum Category {
  savings = "savings",
  college = "college",
  food = "food" 
}

@Entity()
export class BudgetModel {

  @PrimaryGeneratedColumn()
  id: string

  // use enum for category
  @Column()
  category: Category

  @Column()
  income: number
  
  @Column()
  startDate: Date

  @Column()
  endDate: Date


}
