import { UserRegisterDto } from "../dto/user-register.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { User } from "../schema/user.schema";

export interface IUsersService {
    getUsers(): Promise<User[]>,
    getUserById(userId: string): Promise<User>,
    addUser(userRegisterDto: UserRegisterDto): Promise<User>
    validateUser(username: string, password: string): Promise<UserResponseDto>    
}