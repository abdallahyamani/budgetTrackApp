import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class BudgetModel {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  category: string

  @Column()
  income: number
  
  @Column()
  startDate: Date

  @Column()
  endDate: Date


}
