import { MongoRepository } from "src/common/utils/MongoRepository";
import { Camp } from "../model/camp.model";
import { Injectable } from "@nestjs/common";
import { Collection } from "src/common/decorator/collection.decorator";
import { ObjectId } from "mongodb";

@Injectable()
@Collection('campCollection')
export class CampRepository extends MongoRepository<Camp, string> {}