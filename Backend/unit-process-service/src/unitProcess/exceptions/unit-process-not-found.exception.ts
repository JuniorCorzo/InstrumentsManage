import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { ResponseMessages } from "src/common/enums/response-messages";

export class UnitProcessNotFound extends HttpException {
    constructor() {
        super(ResponseMessages.UNIT_PROCESS_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
}