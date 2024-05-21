import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schema/user.schema";
import { UsersService } from "../users/user.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { IAuthService } from "./interface/service.interface";
import { JwtService } from "@nestjs/jwt";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { UserRegisterDto } from "../users/dto/user-register.dto";
import { genPersonalKey } from "src/utils/hash.util";

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
        const payload = { userId: user._id, personalKey: user.personalKey };
        const token = this.jwtService.sign(payload);

        return { token, user };
    }

    async logout(user: UserResponseDto): Promise<String> {
        const userById: UserDocument = await this.userService.getUserById(user._id);
        userById.personalKey = await genPersonalKey();
        
        userById.save();

        return "Done Logout";
    }

    async register(userRegisterDto: UserRegisterDto): Promise<User> {
        return this.userService.addUser(userRegisterDto);
    }
}