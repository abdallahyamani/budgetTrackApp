import { Property } from "@tsed/schema";
import { BudgetModel, Category } from "src/models/budgetModel";

export class BudgetResponse implements BudgetModel {

    @Property()
    id: string
    
    @Property()
    category: Category

    @Property()
    income: number

    @Property()
    startDate: Date
    
    @Property()
    endDate: Date    
}