import { Middleware, Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";

require('dotenv').config();
@Middleware()
export class AuthMiddleware {

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
             // Store the token in the request context
             ctx.request.$ctx.token = token

            } catch (err) {
                ctx.response.status(401)
                throw new Error(err.message)
            }
        }
    }
