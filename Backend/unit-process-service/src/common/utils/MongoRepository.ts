import { Inject } from "@nestjs/common";
import { Collection, Document, ObjectId, OptionalUnlessRequiredId, UpdateFilter, WithId } from "mongodb"
import { ConnectDB } from "src/common/config/ConnectDB";
import { UnitProcess } from "src/unitProcess/model/unit-process.model";


export class MongoRepository<T, ID> {
    private readonly collection: Collection<T>

    constructor(@Inject() clientMongo: ConnectDB){

        this.collection = clientMongo.getConnection()
                                    .db('unitProcess')
                                    .collection(Reflect.getMetadata('collection_name', UnitProcess))
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

    public async update(document: WithId<T>) {
        try {
            const {_id, ...documentWithoutId} = document
            await this.collection.updateOne(
                    {_id: _id as UpdateFilter<T> },
                    {$set: documentWithoutId as Partial<T>})
        } catch (error) {
            console.log(error)
        }
    }

    public async delete(id: ID) {
        await this.collection
            .deleteOne({ _id:  new ObjectId(id as string )} as WithId<T>)
            
    }
}
