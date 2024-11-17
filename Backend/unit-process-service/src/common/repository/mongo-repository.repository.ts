import { Inject } from "@nestjs/common";
import { Collection, Filter, ObjectId, OptionalUnlessRequiredId, WithId } from "mongodb"
import { ConnectDB } from "src/common/config/ConnectDB";

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
            return await this.collection.find().toArray()
        } catch (error) {
            console.error(error)
        }
    }

    public async findById(id: ID): Promise<WithId<T>> {
        try {
            return await this.collection.findOne({ _id: new ObjectId(id as string) as Filter<T> })
        } catch (error) {
            console.error(error)
        }
    }

    public async insert(document: OptionalUnlessRequiredId<T>) {
        try {
            return await this.collection.insertOne(document)
        } catch (error) {
            console.error(error)
        }
    }

    public async update(document: WithId<T>) {
        try {
            const { _id, ...documentWithoutId } = document
            return await this.collection.updateOne(
                { _id: new ObjectId(_id) as Filter<T> },
                { $set: documentWithoutId as Partial<T> })
                    .then(data => console.log(data))
        } catch (error) {
            console.error(error)
        }
    }

    public async delete(id: ID) {
        await this.collection
            .deleteOne({ _id: new ObjectId(id as string) } as WithId<T>)
    }

    public async existById(id: ID): Promise<boolean | undefined | void> {
        try {
            const data = await this.findById(id)

            return data === null
        } catch (err) { console.error(err) }
    }
}
