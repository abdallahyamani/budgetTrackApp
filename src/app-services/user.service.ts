import { Inject, Injectable } from "@tsed/di";
import { USER_REPOSITORY } from '../repository/user.repository';
import { UserResponse } from "src/dto/response/user.response";
import { Exception, NotFound } from "@tsed/exceptions";
import { UserRequest } from "src/dto/request/user.request";

@Injectable()
export class UserService {

    @Inject(USER_REPOSITORY)
    protected userRepository: USER_REPOSITORY

    async getAll(): Promise<UserResponse[]> {
        return await this.userRepository.find()
    }

    async getById(user_id: string): Promise<UserResponse | null> {
        return await this.userRepository.findOne({ where: { user_id: user_id } })
    }

    async createUser(user: UserRequest): Promise<UserResponse> {
        return await this.userRepository.save(user)
    }

    async updateUser(user_id: string, user: UserRequest): Promise<any> {
        try {
            const existUser = await this.userRepository.findOne({ where: { user_id } })
            if (!existUser) throw new NotFound("User not found")

            const updatedUser = await this.userRepository.update(user_id, user)
            if (updatedUser.affected === 0) {
                // The update didn't affect any records (e.g., if the provided data is the same as the existing data)
                throw new Error("Update failed");
            }
            return "Updated User " + user_id;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw new Exception(500, error.message);
            }
        }
    }

    async deleteUser(user_id: string): Promise<any> {
        try {
            const exists = await this.userRepository.findOne({ where: { user_id } })
            if (!exists) throw new NotFound("User not found")

            const deletedUser = await this.userRepository.delete(user_id);
            if (deletedUser.affected === 0) {
                throw new Error("Failed to delete User. User doesn't exist");
            }
            return 'Deleted User ' + user_id

        } catch (error) {
            if (error instanceof NotFound) throw error;
            else throw new Exception(500, error.message);
        }
    }

}