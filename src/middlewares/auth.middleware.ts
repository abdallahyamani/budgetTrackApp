import { Inject, Middleware, Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_REPOSITORY } from "src/repository/user.repository";
import { BudgetService } from "src/app-services/budget.service";
import { UserService } from "src/app-services/user.service";

require('dotenv').config();

@Middleware()
export class AuthMiddleware {

    @Inject(USER_REPOSITORY)
    protected repo: USER_REPOSITORY

    @Inject(BudgetService)
    protected budgetService: BudgetService

    @Inject(UserService)
    protected userService: UserService

    async use(@Req() request: Req, @Context() ctx: Context) {
        try {
            const authHeader = ctx.request.headers["authorization"];
            if (!authHeader) {
                ctx.response.status(401);
                throw new Error("Authentication required");
            }

            // Extract the token part (Bearer) and the token itself
            const [bearer, token] = authHeader.split(" ")

            if (bearer !== "Bearer" || !token) {
                ctx.response.status(401);
                throw new Error("Invalid token")
            }
            const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY as string) as JwtPayload

            // Extract the user ID from the payload
            const userId = decodedToken.userid_Checked
            const user = await this.userService.getById(userId)

            // Fetch the budget record from your database
            const budgetId = request.params.budgetId
            const budget = await this.budgetService.getbyId(budgetId);

            // Check if the userId matches the one associated with the budget record

            if (!user || user.role === 'customer')  // admin can access other records, while customer only corresponding user's budget 
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