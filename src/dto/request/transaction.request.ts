import { Property } from "@tsed/schema";


export class TransactionRequest {

    @Property()
    budget_id: string
    
    @Property()
    description: string

    @Property()
    amount: number

}