import { HttpException, HttpStatus, Injectable, NotFoundException, UseFilters } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ResponseMessages } from "src/common/enums/response-messages";
import { IdNotValid } from "src/common/exceptions/id-not-valid.exception";
import { UnitProcessRepository } from "../repositories/unit-process.repository";
import { UnitProcessNotFound } from "../exceptions/unit-process-not-found.exception";
import { isObservable } from "rxjs";

@Injectable()
export class UnitProcessValidations {
    constructor(private readonly unitProcessRepository: UnitProcessRepository) { }

    public validId(id: string) {
        if (!ObjectId.isValid(id)) {
            console.error(ResponseMessages.ID_NOT_VALID)
            throw new IdNotValid()
        }
    }

    public async validIdExist(id: string) {
        this.validId(id)
        try {
            const isValid: boolean | void = await this.unitProcessRepository.existById(id)
            if (isValid) throw new UnitProcessNotFound()
        } catch (err) {
            throw new UnitProcessNotFound()
        }
    }

}