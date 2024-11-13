import { Inject } from "@nestjs/common";
import { Collection, OptionalUnlessRequiredId, WithId } from "mongodb"
import { ConnectDB } from "src/shared/config/ConnectDB";

export class MongoRepository<T, ID> {
    private readonly collection: Collection<T>
    constructor(clientMongo: ConnectDB, collectionName: string){
        this.collection = clientMongo.getConnection()
                                    .db('unitProcess')
                                    .collection(collectionName)
    }

    public async findAll(): Promise<WithId<T>[]>{
        try {
           const data = await this.collection.find().toArray().then(data => data)
           return data;
        } catch (error) {
            console.error(error)
        }
    }

    public async findById(id: ID) {
        try {
            const data = await this.collection.findOne({_id: id}).then(data => data)
            return data
        } catch (error) {
            console.error(error)
        }
    }

    public async insert(document: OptionalUnlessRequiredId<T>) {
        try {
            await this.collection.insertOne(document);
        } catch (error) {
            console.error(error)
        }
    }

    public async update(document: []) {
        try {
            await this.collection.updateOne({_id: document['id']}, document)            
        } catch (error) {
            console.log(error)
        }
    }

    public async delete(id: ID) {
        await this.collection.deleteOne({_id: id})
    }
}