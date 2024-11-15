import { Injectable } from "@nestjs/common";
import { CampRepository } from "../repositories/camp.repository";
import { Camp } from "../model/camp.model";
import { WithId } from "mongodb";

@Injectable()
export class CampService {
    constructor(private readonly campRepository: CampRepository){}

    public getAllCamps(){
        return this.campRepository.findAll()
    }

    public getCampById(id: string): Promise<WithId<Camp>> {
        
        return this.campRepository.findById(id)
    }

    public insertCamp(camp: WithId<Camp>) {
        return this.campRepository.insert(camp)
    }

    public updateCamp(camp: WithId<Camp>) {
        return this.campRepository.update(camp)
    }

    public deleteCamp(id: string) {
        return this.campRepository.delete(id)
    }
}