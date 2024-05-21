import { UserResponseDto } from "src/modules/users/dto/user-response.dto";
import { User } from "src/modules/users/schema/user.schema";

export class AuthResponseDto {
    token: string;
    user: User | UserResponseDto
}