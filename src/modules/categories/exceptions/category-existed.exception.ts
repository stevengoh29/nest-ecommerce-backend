import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryExistedException extends HttpException {
    constructor() {
        super("Category has already existed. Please select a new name.", HttpStatus.BAD_REQUEST);
    }
}