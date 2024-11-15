import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ResponseMessages } from "src/common/enums/response-messages";
import { IdNotValid } from "src/common/exceptions/id-not-valid.exception";
import { UnitProcessRepository } from "../repositories/unit-process.repository";
import { UnitProcessNotFound } from "../exceptions/unit-process-not-found.exception";

@Injectable()
export class UnitProcessValidations {
    constructor(private readonly unitProcessRepository: UnitProcessRepository) { }

    private validId(id: string) {
        if (!ObjectId.isValid(id)) {
            console.error(ResponseMessages.ID_NOT_VALID)
            throw new IdNotValid()
        }
    }

    public validIdByExist(id: string) {
        this.validId(id)
        if (!this.unitProcessRepository.existById(id)) {
            console.error(ResponseMessages.UNIT_PROCESS_NOT_FOUND)
            throw new UnitProcessNotFound()
        }
    }
}