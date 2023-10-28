import { Inject, Req } from "@tsed/common"
import { Middleware } from "@tsed/platform-middlewares"
import { Context } from "@tsed/platform-params"
import { JwtPayload } from "jsonwebtoken"
import jwt from 'jsonwebtoken';
import { UserService } from "../app-services/user.service";
import { USER_REPOSITORY } from "../repository/user.repository";
import { TransactionService } from "src/app-services/transaction.service";

@Middleware()
export class TransactionAuthMiddleware {

    @Inject(USER_REPOSITORY)
    protected repo: USER_REPOSITORY

    @Inject(TransactionService)
    protected transactionService: TransactionService

    @Inject(UserService)
    protected userService: UserService
    
    async use(@Req() request: Req, @Context() ctx: Context) {

        try {
            const token = ctx.request.$ctx.token;
            const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY as string) as JwtPayload

            // Extract the user ID from the payload
            const userId = decodedToken.userid_Checked
            const user = await this.userService.getById(userId)

            // Fetch the transaction record from your database
            const transactionId = request.params.transactionId
            const transaction = await this.transactionService.getById(transactionId)


            // Check if the userId matches the one associated with the transaction record
            if (!user || user.role !== 'admin')  // admin can access all users' records, while customer only corresponding user's transaction 
            {
                if (!transaction || transaction.user_id !== userId) {
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