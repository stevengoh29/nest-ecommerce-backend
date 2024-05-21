import { Controller, Get, Post, Req, Res, UseGuards, Body } from "@nestjs/common";
import { Request, Response } from 'express';
import { AuthService } from "./auth.service";
import { ResponseUtil } from "src/utils/response.util";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UserRegisterDto } from "../users/dto/user-register.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { IAuthRequest } from "./interface/service.interface";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
    private responseUtil = new ResponseUtil();
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req: IAuthRequest, @Res() res: Response) {
        const result = await this.authService.login(req.user);
        return this.responseUtil.buildResponse(res, result);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/logout")
    async logout(@Req() req: IAuthRequest, @Res() res: Response) {
        const result = await this.authService.logout(req.user);
        return this.responseUtil.buildResponse(res, result);
    }

    @Post("/register")
    async register(@Body(new ValidationPipe()) userRegisterDto: UserRegisterDto, @Res() res) {        
        const result = await this.authService.register(userRegisterDto);
        return this.responseUtil.buildResponse(res, result);
    }
}