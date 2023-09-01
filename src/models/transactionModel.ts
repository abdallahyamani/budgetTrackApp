import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetModel } from './budgetModel';
import { Property } from "@tsed/schema";

@Entity()
export class TransactionModel {

  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => BudgetModel, (budget: BudgetModel) => budget.id)
  @JoinColumn({ name: "budget_id" })
  budget: BudgetModel

  @Column()
  budget_id: string

  @Column()
  amount: number

  @Column()
  description: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
