import { Property } from "@tsed/schema";


export class TransactionRequest {

    @Property()
    budget_id: string

    @Property()
    amount: number

    @Property()
    description: string

}