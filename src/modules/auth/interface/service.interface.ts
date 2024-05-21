import { User } from "src/modules/users/schema/user.schema";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { UserResponseDto } from "src/modules/users/dto/user-response.dto";
import { Request } from 'express'
import { UserRegisterDto } from "src/modules/users/dto/user-register.dto";

export interface IAuthService {
    login(user: UserResponseDto): Promise<AuthResponseDto>;
    register(userRegisterDto: UserRegisterDto): Promise<User>;
    logout(): Promise<String>;
}

export interface IAuthRequest extends Request {
    user: UserResponseDto;
}