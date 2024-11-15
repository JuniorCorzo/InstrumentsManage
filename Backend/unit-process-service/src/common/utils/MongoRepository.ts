import { Inject, Injectable, Scope } from "@nestjs/common";
import { Collection, Document, Filter, ObjectId, OptionalUnlessRequiredId, UpdateFilter, WithId } from "mongodb"
import { Camp } from "src/camp/model/camp.model";
import { ConnectDB } from "src/common/config/ConnectDB";
import { UnitProcess } from "src/unitProcess/model/unit-process.model";

export class MongoRepository<T, ID> {
    private readonly collection: Collection<T>

    constructor(@Inject() clientMongo: ConnectDB) {
        console.log(Reflect.getMetadata('collection_name', this.constructor))
        this.collection = clientMongo.getConnection()
            .db('unitProcess')
            .collection(Reflect.getMetadata('collection_name', this.constructor))
    }

    public async findAll(): Promise<WithId<T>[]> {
        try {
            const data = await this.collection.find().toArray()
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    public async findById(id: ID) {
        try {
            const data = await this.collection.findOne({ _id: new ObjectId(id as string) as Filter<T> }).then(data => data)
            console.log(data)
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
            const { _id, ...documentWithoutId } = document
            await this.collection.updateOne(
                { _id: new ObjectId(_id) as Filter<T> },
                { $set: documentWithoutId as Partial<T> }).then(data => console.log(data))
        } catch (error) {
            console.log(error)
        }
    }

    public async delete(id: ID) {
        await this.collection
            .deleteOne({ _id: new ObjectId(id as string) } as WithId<T>)

    }
}
