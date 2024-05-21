import { Injectable } from "@nestjs/common";
import { User } from "../users/schema/user.schema";
import { UsersService } from "../users/user.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { IAuthService } from "./interface/service.interface";
import { JwtService } from "@nestjs/jwt";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { UserRegisterDto } from "../users/dto/user-register.dto";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<UserResponseDto> {
        const user = await this.userService.validateUser(username, password);
        return user;
    }

    async login(user: UserResponseDto): Promise<AuthResponseDto> {
        const payload = { userId: user._id };
        const token = this.jwtService.sign(payload);

        return { token, user };
    }

    async logout(): Promise<String> {
        return null;
    }

    async register(userRegisterDto: UserRegisterDto): Promise<User> {
        return this.userService.addUser(userRegisterDto);
    }
}