import { Property } from "@tsed/schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BudgetModel {

  @PrimaryGeneratedColumn()
  @Property()
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
