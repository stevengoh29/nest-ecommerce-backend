import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from 'src/utils/response.util';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { SubcategoryService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoryController {
    private readonly responseUtil = new ResponseUtil();
    constructor(private readonly subcategoryService: SubcategoryService) { }

    @Get()
    async getCategories(@Res() res: Response) {
        const result = await this.subcategoryService.getAllSubcategories();
        return this.responseUtil.buildResponse(res, result);
    }

    @Get(":categoryId")
    async getCategoryById(@Param("categoryId") categoryId: string, @Res() res: Response) {
        const result = await this.subcategoryService.getSubcategoryById(categoryId);
        return this.responseUtil.buildResponse(res, result);
    }

    @Post()
    async addCategory(@Body() createSubcategoryDto: CreateSubcategoryDto, @Res() res: Response) {
        const result = await this.subcategoryService.addSubcategory(createSubcategoryDto);
        return this.responseUtil.buildResponse(res, result);
    }

    @Put(":categoryId")
    async editCategoryById(@Param("categoryId") categoryId: string, @Body() createSubcategoryDto: CreateSubcategoryDto, @Res() res: Response) {
        const result = await this.subcategoryService.editSubcategoryById(categoryId, createSubcategoryDto);
        return this.responseUtil.buildResponse(res, result);
    }

    @Delete(":categoryId")
    async deleteCategoryById(@Param("categoryId") categoryId: string, @Res() res: Response) {
        const result = await this.subcategoryService.deleteSubcategoryById(categoryId);
        return this.responseUtil.buildResponse(res, result);
    }
}
