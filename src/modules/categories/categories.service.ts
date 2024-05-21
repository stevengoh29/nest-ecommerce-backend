import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryExistedException } from './exceptions/category-existed.exception';
import { ICategoryService } from './interface/service.interface';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoriesService implements ICategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) { }

    async addCategory(payload: CreateCategoryDto): Promise<CategoryDocument> {
        const categoryExisted = await this.categoryModel.findOne({ categoryName: payload.categoryName, isDeleted: false });
        if (categoryExisted) throw new CategoryExistedException();

        const category = await this.categoryModel.create(payload);
        return category;
    }

    async deleteCategoryById(categoryId: string): Promise<String> {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) throw new CategoryExistedException();

        category.isDeleted = true;
        category.save();

        return "Delete has been successfully deleted.";
    }

    async editCategoryById(categoryId: string, payload: CreateCategoryDto): Promise<CategoryDocument> {
        const category = await this.categoryModel.findById(categoryId);
        const updated = await category.updateOne({ $set: payload }, { new: true });

        return updated;
    }

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.find({ isDeleted: false });
        return categories;
    }

    async getCategoryById(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.findById(categoryId);
        return category;
    }
}
