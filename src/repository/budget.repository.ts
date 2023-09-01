import { registerProvider } from "@tsed/common";
import { MysqlDataSource } from "../datasources/MysqlDatasource";
import { BudgetModel } from "../models/budgetModel";

export const BudgetRepository = MysqlDataSource.getRepository(BudgetModel)

export const BUDGET_REPOSITORY = Symbol.for('BudgetRepository')
export type BUDGET_REPOSITORY = typeof BudgetRepository
registerProvider({
    provide: BUDGET_REPOSITORY,
    useValue: BudgetRepository
})