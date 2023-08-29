import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class BudgetModel {

  @PrimaryGeneratedColumn("uuid")
  id: string

  // use enum for category
  @Column()
  category: string

  @Column()
  income: number
  
  @Column()
  startDate: Date

  @Column()
  endDate: Date


}
