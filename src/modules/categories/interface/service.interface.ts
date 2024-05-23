import { CategoryDto } from "../dto/category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CreateSubcategoryDto } from "../dto/create-subcategory.dto";
import { Category } from "../schema/category.schema";
import { Subcategory } from "../schema/subcategory.schema";

export interface ICategoryService {
    getAllCategories(): Promise<Category[]>,
    getCategoryById(categoryId: string): Promise<Category>,
    addCategory(payload: CreateCategoryDto): Promise<CategoryDto>,
    editCategoryById(categoryId: string, payload: CreateCategoryDto): Promise<CategoryDto>,
    deleteCategoryById(categoryId: string): Promise<String>
}

export interface ISubcategoryService {
    getAllSubcategories(): Promise<Subcategory[]>,
    getSubcategoryById(subcategoryId: string): Promise<Subcategory>,
    addSubcategory(payload: CreateSubcategoryDto): Promise<Subcategory>,
    editSubcategoryById(subcategoryId: string, payload: CreateSubcategoryDto): Promise<Subcategory>,
    deleteSubcategoryById(subcategoryId: string): Promise<String>
}