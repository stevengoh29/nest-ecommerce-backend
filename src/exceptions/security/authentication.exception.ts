import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthenticationException extends HttpException {
    constructor() {
        super("Invalid username or password. Please try again", HttpStatus.UNAUTHORIZED);
    }
}