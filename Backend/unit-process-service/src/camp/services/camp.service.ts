import { HttpStatus, Injectable } from "@nestjs/common";
import { CampRepository } from "../repositories/camp.repository";
import { Camp } from "../model/camp.model";
import { WithId } from "mongodb";
import { CampValidations } from "../validations/camp.validation";
import { ResponseDTO } from "src/common/dto/response.dto";
import { ResponseMessages } from "src/common/enums/response-messages";

@Injectable()
export class CampService {
    constructor(
        private readonly campRepository: CampRepository,
        private readonly campValidation: CampValidations
    
    ){}

    public async getAllCamps(){
        const campData = await this.campRepository.findAll()
        return new ResponseDTO(
            HttpStatus.OK,
            ResponseMessages.OK,
            campData
        )
    }

    public async getCampById(id: string) {        
        await this.campValidation.validIdExist(id)
        const campData = await this.campRepository.findById(id)

        return new ResponseDTO<Camp>(
            HttpStatus.OK,
            ResponseMessages.OK,
            campData
        )
    }

    //TODO:: Devolver el campo creado
    public async insertCamp(camp: WithId<Camp>) {
        await this.campRepository.insert(camp)
        
        return new ResponseDTO(
            HttpStatus.CREATED,
            ResponseMessages.OK
        )
    }

    //TODO:: Devolver el campo actualizado
    public async updateCamp(camp: WithId<Camp>) {
        await this.campValidation.validIdExist(camp._id.toString())
        await this.campRepository.update(camp)
        
        return new ResponseDTO(
            HttpStatus.OK,
            ResponseMessages.OK
        )
    }

    public async deleteCamp(id: string) {
        await this.campValidation.validIdExist(id)
        await this.campRepository.delete(id)

        return new ResponseDTO(
            HttpStatus.OK,
            ResponseMessages.OK
        )
    }
}