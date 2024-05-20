import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { buildResponse } from 'src/utils/response.util';

@Controller('users')
export class UsersController {
    constructor() { }

    @Get()
    getAllUsers(): string {
        return "hello World"
    }

    @Post()
    addUser(@Req() request: Request, @Res() response: Response) {
        return buildResponse(response, "Hello World");
    }
}