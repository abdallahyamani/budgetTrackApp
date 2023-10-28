import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post, Returns, Tags } from "@tsed/schema";
import jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from "src/repository/user.repository";
import * as bcrypt from "bcrypt"

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


            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, userChecked.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            // get user_id for provided email 
            const userid_Checked = userChecked.user_id
            console.log("Id for associated email is: " + userid_Checked)

            // If the email & password are valid, create and return a JWT token
            // remove pass from payload
            const token = jwt.sign({ email: email, userid_Checked }, process.env.API_SECRET_KEY as string, { expiresIn: "1h" })
            console.log(token)
            return token
        } catch (err) {
            throw new Error(err)
        }

    }
}