import { Injectable } from "@nestjs/common";
import { Category } from "./schema/category.schema";
import { Subcategory } from "./schema/subcategory.schema";
import { ISubcategoryService } from "./interface/service.interface";
import { CreateSubcategoryDto } from "./dto/create-subcategory.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CategoriesService } from "./categories.service";
import { Model } from "mongoose";
import { CategoryNotExistedException } from "./exceptions/category-not-existed.exception";
import { SubcategoryExistedException } from "./exceptions/subcategory-existed.exception";
import { SubcategoryNotExistedException } from "./exceptions/subcategory-not-existed.exception";

@Injectable()
export class SubcategoryService implements ISubcategoryService {
    constructor(
        @InjectModel(Subcategory.name) private readonly subCategoryModel: Model<Subcategory>,
        private readonly categoryService: CategoriesService
    ) { }

    async getAllSubcategories(): Promise<Subcategory[]> {
        const subcategories = await this.subCategoryModel.find({ isDeleted: false }).populate("category");
        return subcategories;
    }

    async getSubcategoryById(subcategoryId: string): Promise<Subcategory> {
        const subcategory = await this.subCategoryModel.findById(subcategoryId).populate("category");
        if (subcategory.isDeleted) return null;

        return subcategory;
    }

    async addSubcategory(payload: CreateSubcategoryDto): Promise<Subcategory> {
        const categoryExist = await this.categoryService.existsCategoryById(payload.category);
        if (!categoryExist) throw new CategoryNotExistedException();

        const subcategoryExist = await this.subCategoryModel.countDocuments({ subcategoryName: payload.subcategoryName, isDeleted: false });
        if (subcategoryExist > 0) throw new SubcategoryExistedException();

        const subcategory = await this.subCategoryModel.create(payload);
        return subcategory;
    }

    async editSubcategoryById(subcategoryId: string, payload: CreateSubcategoryDto): Promise<Subcategory> {
        const categoryExist = await this.categoryService.existsCategoryById(payload.category);
        if (!categoryExist) throw new CategoryNotExistedException();

        const subcategory = await this.subCategoryModel.findById(subcategoryId);
        if (!subcategory) throw new SubcategoryNotExistedException();

        const updated = await subcategory.updateOne({ $set: payload }, { new: true })
        return updated;
    }

    async deleteSubcategoryById(subcategoryId: string): Promise<String> {
        const subcategory = await this.subCategoryModel.findById(subcategoryId);
        if (!subcategory) throw new SubcategoryNotExistedException();

        subcategory.isDeleted = true;
        subcategory.save();
        
        return "Delete Success";
    }
}