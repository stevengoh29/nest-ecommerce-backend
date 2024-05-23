import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubcategoryDto {
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    subcategoryName: string;

    @IsString()
    @IsOptional()
    subcategoryDescription: string;

    @IsString()
    @IsOptional()
    subcategoryImage: string;

    @IsBoolean()
    @IsOptional()
    isInactive: boolean;

    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}