import { Module } from "@nestjs/common";
import bcrypt from 'bcrypt';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserDocument, UserSchema } from "../users/schema/user.schema";
import { UsersModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/user.service";
import { genPersonalKey } from "src/utils/hash.util";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt'
import { SECRET_KEY } from "src/config/application.config";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtStrategy } from "src/strategies/jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: { expiresIn: '20d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})

export class AuthModule { }