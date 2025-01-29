import { Inject } from '@nestjs/common'
import { Collection, ObjectId, OptionalUnlessRequiredId, WithId } from 'mongodb'
import { ConnectDB } from 'src/common/config/ConnectDB'

// TODO:: Mejorar el manejo de excepciones
export class MongoRepository<T, ID> {
  private readonly collection: Collection<T>

  constructor (@Inject() clientMongo: ConnectDB) {
    console.log(Reflect.getMetadata('collection_name', this.constructor))
    this.collection = clientMongo.getConnection()
      .db('unitProcess')
      .collection(Reflect.getMetadata('collection_name', this.constructor))
  }

  public async findAll (): Promise<WithId<T>[]> {
    try {
      return await this.collection.find().toArray()
    } catch (error) {
      console.error(error)
    }
  }

  public async findById (id: string): Promise<WithId<T>> {
    try {
      return await this.collection.findOne({ _id: new ObjectId(id) as ID })
    } catch (error) {
      console.error(error)
    }
  }

  public async insert (document: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
    try {
      const idInsert: string = await this.collection.insertOne(document)
        .then(({ insertedId }) => insertedId.toString())

      if (!ObjectId.isValid(idInsert)) throw new Error('Error al momento de insertar')

      return await this.findById(idInsert)
    } catch (error) {
      console.error(error)
    }
  }

  public async update (document: WithId<T>): Promise<WithId<T>> {
    try {
      const { id, ...withoutIdDocument } = document

      const responseUnitProcess = await this.collection.updateOne(
        { _id: new ObjectId(id) as ID },
        { $set: withoutIdDocument as Partial<T> }
      )
      if (responseUnitProcess.modifiedCount === 0) { throw new Error('Error in update') }

      return await this.findById(id.toString())
    } catch (error) {
      console.error(error.message)
    }
  }

  public async delete (id: ID) {
    await this.collection
      .deleteOne({ id: new ObjectId(id as string) } as WithId<T>)
  }

  public async existById (id: string): Promise<boolean> {
    try {
      const data = await this.findById(id)
      return data === null
    } catch (err) { console.error(err) }
  }
}
