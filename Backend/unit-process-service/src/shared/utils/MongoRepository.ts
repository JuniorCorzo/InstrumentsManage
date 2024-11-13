import { Inject } from "@nestjs/common";
import { Collection, MongoClient } from "mongodb"
import { ConnectDB } from "src/shared/config/ConnectDB";

export class MongoRepository<T> {
    private readonly collection: Collection<T>
    constructor(@Inject() clientMongo: ConnectDB){
        this.collection = clientMongo.getConnection().db('unitProcess').collection('unitProcessCollection')
    }

    public async findAll(){
        try {
           const data = await this.collection.find().toArray().then(data => data)
           return data;
        } catch (error) {
            
        }
    }
}