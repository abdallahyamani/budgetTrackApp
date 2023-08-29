import { Property } from "@tsed/schema";

// remove DTO from class name
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