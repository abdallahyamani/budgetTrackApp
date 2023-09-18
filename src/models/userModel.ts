import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetModel } from "./budgetModel";

@Entity()
export class UserModel {

  @PrimaryGeneratedColumn()
  user_id: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => BudgetModel, (budget:BudgetModel) => budget.budget_id)
  @JoinColumn({ name: "budget_id"})
  budget: BudgetModel

  @Column()
  budget_id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
