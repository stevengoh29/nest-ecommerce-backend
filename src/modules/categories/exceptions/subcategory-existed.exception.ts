import { HttpException, HttpStatus } from "@nestjs/common";

export class SubcategoryExistedException extends HttpException {
    constructor() {
        super("Subategory has already existed. Please select a new name.", HttpStatus.BAD_REQUEST);
    }
}