import { registerProvider } from "@tsed/common";
import { MysqlDataSource } from "src/datasources/MysqlDataSource";
import { BudgetModel } from "src/models/budgetModel";

const BudgetRepository = MysqlDataSource.getRepository(BudgetModel)
const BUDGET_REPOSITORY = Symbol.for('BudgetRepository')

export type BUDGET_REPOSITORY = typeof BudgetRepository
registerProvider({
    provide: BUDGET_REPOSITORY,
    useValue: BudgetRepository
})