import { registerProvider } from "@tsed/di";
import { MysqlDataSource } from "../datasources";
import { UserModel } from "../models/userModel";

export const UserRepository = MysqlDataSource.getRepository(UserModel)
export const USER_REPOSITORY = Symbol.for("UserRepository")

export type USER_REPOSITORY = typeof UserRepository

registerProvider({
    provide: USER_REPOSITORY,
    useValue: UserRepository
})