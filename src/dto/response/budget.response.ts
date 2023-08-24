import { Property } from "@tsed/schema";
import { BudgetModel } from "src/models/budgetModel";

export class BudgetResponseDTO implements BudgetModel {

    @Property()
    id: string
    
    @Property()
    category: string

    @Property()
    income: number

    @Property()
    startDate: Date
    
    @Property()
    endDate: Date    
}