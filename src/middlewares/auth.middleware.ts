import { Middleware, Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import jwt from "jsonwebtoken";

require('dotenv').config();

@Middleware()
export class AuthMiddleware {
    use(@Req() request: Req, @Context() ctx: Context) {
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
            const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY as string)
            console.log(decodedToken)

        } catch (err) {
            ctx.response.status(401)
            throw new Error("Invalid token")
        }
    }
}
