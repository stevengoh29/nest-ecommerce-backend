import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Gender } from "../enum/gender.enum";
import { UserType } from "../enum/user-type.enum";

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    phoneCode: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;

    @IsString()
    @IsOptional()
    image: string;

    @IsEnum(UserType)
    @IsOptional()
    userType: UserType;
}