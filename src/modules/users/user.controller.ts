import { Body, Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ResponseUtil } from 'src/utils/response.util';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './user.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IAuthRequest } from '../auth/interface/service.interface';

@Controller('users')
export class UsersController {
    builder = new ResponseUtil();

    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUsers(@Req() req: IAuthRequest, @Res() res: Response): string {
        this.builder.buildResponse(res, "Hello World");
        return "hello World";
    }

    @Post()
    async addUser(
        @Body(new ValidationPipe()) userRegisterDto: UserRegisterDto,
        @Res() res: Response
    ) {
        const result = await this.usersService.addUser(userRegisterDto);
        return this.builder.buildResponse(res, result);
    }
}