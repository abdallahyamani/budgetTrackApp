import { Property } from "@tsed/schema";

export class BudgetRequestDTO {

    @Property()
    category: string

    @Property()
    income: number

    @Property()
    startDate: Date
    
    @Property()
    endDate: Date
}