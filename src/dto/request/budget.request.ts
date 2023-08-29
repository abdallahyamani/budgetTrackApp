import { Property } from "@tsed/schema";

export class BudgetRequest {

    @Property()
    category: string

    @Property()
    income: number

    @Property()
    startDate: Date
    
    @Property()
    endDate: Date
}