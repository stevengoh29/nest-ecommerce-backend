import { CategoryDto } from "../dto/category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../schema/category.schema";

export interface ICategoryService {
    getAllCategories(): Promise<Category[]>,
    getCategoryById(categoryId: string): Promise<Category>,
    addCategory(payload: CreateCategoryDto): Promise<CategoryDto>,
    editCategoryById(categoryId: string, payload: CreateCategoryDto): Promise<CategoryDto>,
    deleteCategoryById(categoryId: string): Promise<String>
}