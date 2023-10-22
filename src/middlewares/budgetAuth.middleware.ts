import { Inject, Req } from "@tsed/common"
import { Middleware } from "@tsed/platform-middlewares"
import { Context } from "@tsed/platform-params"
import { JwtPayload } from "jsonwebtoken"
import jwt from 'jsonwebtoken';
import { BudgetService } from "../app-services/budget.service";
import { UserService } from "../app-services/user.service";
import { USER_REPOSITORY } from "../repository/user.repository";

@Middleware()
export class BudgetAuthMiddleware {

    @Inject(USER_REPOSITORY)
    protected repo: USER_REPOSITORY

    @Inject(BudgetService)
    protected budgetService: BudgetService

    @Inject(UserService)
    protected userService: UserService
    
    async use(@Req() request: Req, @Context() ctx: Context) {

        try {
            const token = ctx.request.$ctx.token;
            const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY as string) as JwtPayload

            // Extract the user ID from the payload
            const userId = decodedToken.userid_Checked
            const user = await this.userService.getById(userId)

            // Fetch the budget record from your database
            const budgetId = request.params.budgetId
            const budget = await this.budgetService.getbyId(budgetId)


            // Check if the userId matches the one associated with the budget record
            if (!user || user.role !== 'admin')  // admin can access all users' records, while customer only corresponding user's budget 
            {
                if (!budget || budget.user_id !== userId) {
                    request.$ctx.response.status(403) // Forbidden
                    throw new Error("Unauthorized request");
                }
            }

        } catch (err) {
            ctx.response.status(401)
            throw new Error(err.message)
        }
    }
}