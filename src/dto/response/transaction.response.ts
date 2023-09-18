import { Property } from "@tsed/schema";
import { TransactionModel } from "src/models/transactionModel";


export class TransactionResponse implements Partial < TransactionModel > {

    @Property()
    id: string

    @Property()
    budget_id: string
    
    @Property()
    description: string

    @Property()
    amount: number
   
    @Property()
    createdAt: Date

    @Property()
    updatedAt: Date
}