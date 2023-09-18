import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Define  enum for the categories Column
// export enum Category {
//   savings = "savings",
//   college = "college",
//   food = "food"
// }

export type Category = "savings" | "food" | "college"

@Entity()
export class BudgetModel {

  @PrimaryGeneratedColumn()
  budget_id: string

  // @Column({
  //   type: "enum",
  //   enum: Category,
  // })
  //   category: Category

  @Column({
    type: "enum",
    enum: ["savings", "food", "college"],
    // default: "savings"
})
category: Category;

  @Column()
  income: number

  @Column()
  startDate: Date

  @Column()
  endDate: Date

}
