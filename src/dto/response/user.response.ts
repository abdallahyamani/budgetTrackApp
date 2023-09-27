import { UserModel, UserRole } from "../../models/userModel";
import { Property } from '@tsed/schema';


export class UserResponse implements Partial< UserModel > {

    @Property()
    user_id: string
  
    @Property()
    email: string
  
    @Property()
    password: string

    @Property()
    role: UserRole
  
    @Property()
    createdAt: Date
  
    @Property()
    updatedAt: Date

}