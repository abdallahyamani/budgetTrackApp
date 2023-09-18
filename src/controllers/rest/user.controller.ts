import { Controller, Inject } from "@tsed/di";
import { UserService } from "../../app-services/user.service";
import { Delete, Get, Post, Put, Returns } from "@tsed/schema";
import { UserRequest } from "../../dto/request/user.request";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { UserResponse } from "../../dto/response/user.response";
import { UseBefore } from "@tsed/common";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Controller('/user')

// Applying auth middleware to controller
@UseBefore(AuthMiddleware)
export class UserController {

    @Inject(UserService)
    protected service: UserService

    @Get('/:userId')
    @Returns(200, Array).Of(UserRequest)
    async getById(@PathParams('userId') user_id: string): Promise<UserResponse | null> {
        try {
            return await this.service.getById(user_id)
        } catch (error) {
            throw new Error(error)
        }
    }

    @Post('/')
    async createUser(@BodyParams() user: UserRequest): Promise<UserResponse> {
        try {
            return await this.service.createUser(user)
        } catch (error) {
            throw new Error(error)
        }
    }

    @Put('/:userId')
    async updateUser(
        @PathParams('userId') user_id: string,
        @BodyParams() newUser: UserRequest
    ): Promise<UserResponse> {
        try {
            let user = await this.service.getById(user_id)
            if (!user) {
                throw new Error('User not found')
            }
            user.email = newUser.email
            user.password = newUser.password
            user.budget_id = newUser.budget_id

            const updatedUser = await this.service.updateUser(user_id, newUser)
            return updatedUser

        } catch (error) {
            throw new Error(error)
        }
    }
    
    @Delete('/:userId')
    async deleteById(@PathParams('userId') user_id: string): Promise<any> {
        return await this.service.deleteUser(user_id)
    }

}