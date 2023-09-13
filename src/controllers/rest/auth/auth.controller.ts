import { Controller } from "@tsed/di";
import { QueryParams } from "@tsed/platform-params";
import { Get, Returns, Tags } from "@tsed/schema";
import jwt from 'jsonwebtoken';

@Controller("/auth")
@Tags('Auth')
export class AuthController {

    @Get("/login")
    @Returns(200)
    async login(@QueryParams("username") username: string, @QueryParams("password") password: string): Promise<any> {
        const user = {
            id: 1,
            username: "admin",
            password: "admin"
        }
        try {
            if (user.password !== password) {
                return "Invalid password!"
            } else if (user.username !== username) {
                return "Invalid username!"
            }

            // I was having error with process.env.API_SECRET_KEY 
            const token = jwt.sign(user, process.env.API_SECRET_KEY as string, { expiresIn: "1h" })
            console.log(token)
            return token

        } catch (error) {
            throw new Error(error)
        }

    }
}