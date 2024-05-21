import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryName: string;

    @IsString()
    @IsOptional()
    categoryDescription: string;

    @IsString()
    @IsOptional()
    categoryImage: string;

    @IsBoolean()
    @IsOptional()
    isInactive: boolean;

    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}