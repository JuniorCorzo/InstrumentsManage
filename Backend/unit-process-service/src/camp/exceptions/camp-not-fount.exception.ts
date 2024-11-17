import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseMessages } from "src/common/enums/response-messages";

export class CampNotFound extends HttpException {
    constructor() {
        super(ResponseMessages.CAMP_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
}