import { HttpException, HttpStatus } from "@nestjs/common";

export class SubcategoryNotExistedException extends HttpException {
    constructor() {
        super("Subcategory does not exist. Make sure you have entered the correct id.", HttpStatus.BAD_REQUEST);
    }
}