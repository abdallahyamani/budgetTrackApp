import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetModel } from './budgetModel';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generation function

@Entity()
export class TransactionModel {

  @PrimaryGeneratedColumn()
  transaction_id: string

  @ManyToOne(() => BudgetModel, (budget: BudgetModel) => budget.budget_id)
  @JoinColumn({ name: "budget_id" })
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
