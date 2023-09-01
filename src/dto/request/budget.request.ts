import { Property } from "@tsed/schema";
import { Category } from "src/models/budgetModel"

export class BudgetRequest {

    @Property()
    category: Category

    @Property()
    income: number

    @Property()
    startDate: Date

    @Property()
    endDate: Date
}