import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetModel } from './budgetModel';
import { UserModel } from "./userModel";

@Entity()
export class TransactionModel {

  @PrimaryGeneratedColumn()
  transaction_id: string

  @ManyToOne(() => BudgetModel, (budget: BudgetModel) => budget.budget_id)
  @JoinColumn({ name: "budget_id" })
  budget: BudgetModel

  @ManyToOne(() => UserModel, (user: UserModel) => user.user_id)
  @JoinColumn({ name: "user_id" })
  user: UserModel

  @Column()
  user_id: string
  
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
