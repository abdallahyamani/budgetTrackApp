import { UserModel } from "src/models/userModel";
import { Property } from '@tsed/schema';


export class UserResponse implements Partial< UserModel > {

    @Property()
    user_id: string
  
    @Property()
    email: string
  
    @Property()
    password: string
  
    @Property()
    createdAt: Date
  
    @Property()
    updatedAt: Date

    @Property()
    budget_id: string

}