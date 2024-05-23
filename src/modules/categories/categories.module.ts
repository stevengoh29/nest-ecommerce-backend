import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './schema/category.schema';
import { Subcategory, SubcategorySchema } from './schema/subcategory.schema';
import { SubcategoryController } from './subcategories.controller';
import { SubcategoryService } from './subcategories.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Subcategory.name, schema: SubcategorySchema }
  ])],
  controllers: [CategoriesController, SubcategoryController],
  providers: [CategoriesService, SubcategoryService]
})

export class CategoriesModule { }
