import { Property } from "@tsed/schema"

export class UserRequest {

    @Property()
    email: string
  
    @Property()
    password: string

    @Property()
    budget_id: string

}