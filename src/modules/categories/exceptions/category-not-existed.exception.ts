import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryNotExistedException extends HttpException {
    constructor() {
        super("Category does not exist. Make sure you have entered the correct id.", HttpStatus.BAD_REQUEST);
    }
}