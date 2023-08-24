import { Property } from "@tsed/schema";


export class TransactionRequestDTO {

    @Property()
    budget_id: string

    @Property()
    amount: number

    @Property()
    description: string

}