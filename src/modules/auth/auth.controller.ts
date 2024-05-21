import { Controller, Get, Post, Req, Res, UseGuards, Body } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { ResponseUtil } from "src/utils/response.util";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UserRegisterDto } from "../users/dto/user-register.dto";

@Controller("auth")
export class AuthController {
    private responseUtil = new ResponseUtil();
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req, @Res() res: Response) {
        const result = await this.authService.login(req.user);
        return this.responseUtil.buildResponse(res, result);
    }

    @Post("/logout")
    async logout() {

    }

    @Post("/register")
    async register(@Body() userRegisterDto: UserRegisterDto, @Res() res) {        
        const result = await this.authService.register(userRegisterDto);
        return this.responseUtil.buildResponse(res, result);
    }
}