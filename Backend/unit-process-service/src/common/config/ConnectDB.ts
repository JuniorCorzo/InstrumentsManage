import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Injectable()
export class ConnectDB implements OnModuleInit {
  // eslint-disable-next-line no-use-before-define
  private static instance: ConnectDB
  private clientMongo: MongoClient
  private readonly MAX_ATTEMPTS = 10
  private readonly LOGS = new Logger(ConnectDB.name, { timestamp: true })

  private constructor () {
    const { DB_HOST, DB_NAME, DB_PORT } = process.env
    this.clientMongo = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  }

  /**
   * Recursive function to connect to MongoDB
   *
   * @returns MongoClient
   */
  private async connectDB (attempts?: number): Promise<MongoClient> {
    attempts = attempts === undefined ? 0 : attempts
    try {
      await this.clientMongo.connect()
      this.LOGS.log('Connected to MongoDB successfully')
    } catch (error) {
      this.LOGS.error(error.message)
      if (attempts < this.MAX_ATTEMPTS) {
        this.LOGS.log('Attempting to establish a connection to MongoDB')
        return this.connectDB(++attempts)
      }

      this.LOGS.error('Maximum attempts reached. Stopping service.')
      process.exit(1)
    }
  }

  async onModuleInit () {
    await this.connectDB()
  }

  /**
   * Return instance of ConnectDB
   *
   * @returns ConnectDB
   */
  public static getInstance () {
    if (!ConnectDB.instance) ConnectDB.instance = new ConnectDB()
    return ConnectDB.instance
  }

  /**
   * Return the connection to MongoDB
   *
   * @returns MongoClient
   */
  public getConnection ():MongoClient {
    return this.clientMongo
  }
}
