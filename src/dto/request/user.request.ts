import { Property } from "@tsed/schema"
import { UserRole } from "src/models/userModel"

export class UserRequest {

    @Property()
    email: string
  
    @Property()
    password: string

    @Property()
    role: UserRole

}