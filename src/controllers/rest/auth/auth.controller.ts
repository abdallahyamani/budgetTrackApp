import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post, Returns, Tags } from "@tsed/schema";
import jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from "src/repository/user.repository";

@Controller("/auth")
@Tags('Auth')
export class AuthController {

    @Inject(USER_REPOSITORY)
    protected repo: USER_REPOSITORY

    @Post("/login")
    @Returns(200, String)
    async login(
        @BodyParams("email") email: string,
        @BodyParams("password") password: string
    ): Promise<any> {
        try {
            if (!email || !password) {
                throw new Error("Invalid payload");
            }

            // Check if the user with the provided email exists in the database.
            const userChecked = await this.repo.findOne({ where: { email: email } })
            if (!userChecked) {
                throw new Error("User not found");
            }

            // get user_id for provided mail (will be used for later)
            const userid_Checked = userChecked.user_id
            console.log("Id for associated email is: " + userid_Checked)

            // Check if password associates to provided email
            if (userChecked.password !== password) {
                throw new Error("Invalid password");
            }

            // If the email & password are valid, create and return a JWT token
            const token = jwt.sign({ email: email, password: password, userid_Checked }, process.env.API_SECRET_KEY as string, { expiresIn: "1h" })
            console.log(token)

            return token
        } catch (err) {
            throw new Error(err)
        }

    }
}

// }
// async login(@QueryParams("username") username: string, @QueryParams("password") password: string): Promise<any> {
//     const admin = {
//         id: 1,
//         username: "admin",
//         password: "admin"
//     }
//     try {
//         if (admin.password !== password) {
//             return "Invalid password!"
//         } else if (admin.username !== username) {
//             return "Invalid username!"
//         }

//         const token = jwt.sign(admin, process.env.API_SECRET_KEY as string, { expiresIn: "1h" })
//         console.log(token)
//         return token

//     } catch (error) {
//         throw new Error(error)
//  }