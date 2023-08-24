import { Property } from "@tsed/schema";
import { TransactionModel } from "src/models/transactionModel";


export class TransactionResponseDTO implements Partial < TransactionModel > {

    @Property()
    id: string

    @Property()
    budget_id: string

    @Property()
    amount: number

    @Property()
    description: string

    @Property()
    createdAt: Date

    @Property()
    updatedAt: Date
}