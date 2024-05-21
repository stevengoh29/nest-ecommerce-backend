import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ResponseUtil } from 'src/utils/response.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
    private readonly responseUtil = new ResponseUtil();
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    async getCategories(@Res() res: Response) {
        const result = await this.categoriesService.getAllCategories();
        return this.responseUtil.buildResponse(res, result);
    }

    @Get(":categoryId")
    async getCategoryById(@Param("categoryId") categoryId: string, @Res() res: Response) {
        const result = await this.categoriesService.getCategoryById(categoryId);
        return this.responseUtil.buildResponse(res, result);
    }

    @Post()
    async addCategory(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
        const result = await this.categoriesService.addCategory(createCategoryDto);
        return this.responseUtil.buildResponse(res, result);
    }

    @Put(":categoryId")
    async editCategoryById(@Param("categoryId") categoryId: string, @Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
        const result = await this.categoriesService.editCategoryById(categoryId, createCategoryDto);
        return this.responseUtil.buildResponse(res, result);
    }

    @Delete(":categoryId")
    async deleteCategoryById(@Param("categoryId") categoryId: string, @Res() res: Response) {
        const result = await this.categoriesService.deleteCategoryById(categoryId);
        return this.responseUtil.buildResponse(res, result);
    }
}
