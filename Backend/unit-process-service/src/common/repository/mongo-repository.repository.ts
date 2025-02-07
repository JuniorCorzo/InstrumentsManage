import { Inject, Logger } from '@nestjs/common'
import { Collection, MatchKeysAndValues, ObjectId, OptionalUnlessRequiredId, WithId } from 'mongodb'
import { ConnectDB } from 'src/common/config/ConnectDB'
import { MongoException } from '../exceptions/mongo-repository.exception'

/**
 * A generic MongoDB repository class that provides basic CRUD operations.
 *
 * @typeParam T - The type of document/entity being stored
 * @typeParam ID - The type of the document's identifier (usually ObjectId)
 *
 * @example
 * ```typescript
 * // Define your entity type
 * interface User {
 *   id?: string;
 *   name: string;
 *   email: string;
 * }
 *
 * // Create repository instance
 * @Collection('users')
 * class UserRepository extends MongoRepository<User, ObjectId> {}
 *
 * // Usage
 * const userRepo = new UserRepository(mongoConnection);
 *
 *
 * // Read
 * const allUsers = await userRepo.findAll();
 * const user = await userRepo.findById('someId');
 *
 * // Create or Update
 * const newUser = await userRepo.save({ name: 'John', email: 'john@example.com' });
 *
 * // Create
 * const newUser = await userRepo.insert({ name: 'John', email: 'john@example.com' });
 *
 * // Update
 * await userRepo.update({ id: 'someId', name: 'John Updated', email: 'john@example.com' });
 *
 * // Delete
 * await userRepo.delete('someId');
 *
 * // Check existence
 * const exists = await userRepo.existById('someId');m
 * ```
 *
 * @remarks
 * - Requires a MongoDB connection to be injected via constructor
 * - Uses collection name metadata from decorator
 * - Implements standard repository pattern operations
 * - Includes error handling and logging
 *
 * @throws {MongoException} When database operations fail
 */
export class MongoRepository<T, ID> {
  private readonly collection: Collection<T>
  private readonly Logger = new Logger(MongoRepository.name, { timestamp: true })

  constructor (@Inject() clientMongo: ConnectDB) {
    this.collection = clientMongo.getConnection()
      .db('UnitProcess')
      .collection(Reflect.getMetadata('collection_name', this.constructor))
  }

  /**
   * Retrieves all documents from the MongoDB collection.
   *
   * @returns A Promise that resolves to an array of documents with their MongoDB ObjectIds.
   * Each document is of type T and includes the '_id' field.
   *
   * @throws {Error} If there's an error while accessing the database.
   * The error will be logged through the Logger service.
   */
  public async findAll (): Promise<WithId<T>[]> {
    try {
      return await this.collection.find().toArray()
    } catch (error) {
      this.Logger.error(error.message)
    }
  }

  /**
   * Retrieves a document from the collection by its unique identifier.
   *
   * @param _id - The unique identifier of the document to retrieve
   * @returns A Promise that resolves to the document with the specified ID including its MongoDB metadata
   * @throws {Error} If the provided ID is invalid or if there's a database error
   */
  public async findById (_id: string): Promise<WithId<T>> {
    try {
      return await this.collection.findOne({ _id: new ObjectId(_id) as ID })
    } catch (error) {
      this.Logger.error(error.message)
    }
  }

  /**
   * Saves a document to the MongoDB collection. If the document has an ID and exists,
   * it updates the existing document. Otherwise, it inserts a new document.
   *
   * @param document - The document to be saved with optional ID unless required
   * @returns A Promise that resolves to the saved document with its ID
   * @throws {Error} If the update or insert operations fail
   */
  public async save (document: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
    const { _id } = document
    if (_id != null && this.existById(_id)) {
      return this.update(document as WithId<T>)
    }
    return await this.insert(document)
  }

  /**
   * Inserts a new document into the MongoDB collection.
   *
   * @param document - The document to insert, with optional fields unless required by the schema.
   * @returns Promise containing the inserted document with its ID. Returns undefined if insertion fails.
   * @throws {MongoException} If the document cannot be found after insertion.
   */
  public async insert (document: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
    try {
      const responseInsert = await this.collection.insertOne(document)
      const insertedId: string = responseInsert.insertedId.toString()

      if (!(await this.existById(insertedId))) throw new MongoException(`Failed to the insert data in ${this.collection.collectionName}`)
      return await this.findById(insertedId)
    } catch (error) {
      this.Logger.error(error.message)
    }
  }

  /**
   * Updates a document in the MongoDB collection
   *
   * @param document - The document to update, must include an id field
   * @returns Promise containing the updated document
   * @throws Error if the update operation fails or no document is modified
   */
  public async update (document: WithId<T>): Promise<WithId<T>> {
    try {
      const { _id, ...withoutIdDocument } = document
      const { modifiedCount } = await this.collection.updateOne(
        { _id: new ObjectId(_id) as ID },
        { $set: withoutIdDocument as MatchKeysAndValues<T> }
      )

      if (modifiedCount === 0) { this.Logger.warn(`Failed to update data with id ${_id} in ${this.collection.collectionName}`) }
      return await this.findById(_id.toString())
    } catch (error) {
      this.Logger.error(error.message)
    }
  }

  /**
   * Deletes a document from the collection by its ID.
   *
   * @param {ID} _id - The ID of the document to delete.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {MongoException} - Throws an exception if no documents were deleted.
   *
   * @remarks
   * This method logs an error message if the deletion operation fails.
   */
  public async delete (_id: string): Promise<boolean> {
    try {
      if (!(this.existById(_id as string))) throw new MongoException(`Document with id ${_id} not exists in the ${this.collection.collectionName}`)

      const { deletedCount } = await this.collection.deleteOne({ _id: new ObjectId(_id) as ID })
      if (deletedCount === 0) {
        this.Logger.warn(`Failed to delete document with id ${_id} in ${this.collection.collectionName}`)
        return false
      }

      return true
    } catch (error) {
      this.Logger.error(error.message)
    }
  }

  /**
   * Checks if a document exists in the collection by its ID.
   *
   * @param _id - The unique identifier of the document to check.
   * @returns A promise that resolves to `true` if the document exists, `false` otherwise.
   * @throws {Error} If there's an error during the database operation.
   */
  public async existById (_id: string): Promise<boolean> {
    try {
      return await this.findById(_id) !== null
    } catch (err) { console.error(err) }
  }
}
