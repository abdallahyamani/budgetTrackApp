import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetModel } from './budgetModel';

@Entity()

export class TransactionModel {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => BudgetModel, (budget: BudgetModel) => budget.id)
  @JoinColumn({ name: "budget_id"})
  budget: BudgetModel

  @Column()
  budget_id: string

  @Column()
  amount: number

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
