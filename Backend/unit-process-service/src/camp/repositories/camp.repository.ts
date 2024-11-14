import { MongoRepository } from "src/common/utils/MongoRepository";
import { Camp } from "../model/camp.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CampRepository extends MongoRepository<Camp, string> {}