import { Injectable, OnModuleInit } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Injectable()
export class ConnectDB implements OnModuleInit {
  // eslint-disable-next-line no-use-before-define
  private static instance: ConnectDB
  private clientMongo: MongoClient

  private constructor () {
    this.clientMongo = new MongoClient('mongodb://localhost:27019/unitProcces')
  }

  async onModuleInit () {
    try {
      await this.clientMongo.connect()
      console.log('Conexion a MongoDB establecida exitosamente')
    } catch (error) {
      console.error(error)
    }
  }

  public static getInstance () {
    if (!ConnectDB.instance) ConnectDB.instance = new ConnectDB()

    return ConnectDB.instance
  }

  public getConnection ():MongoClient {
    return this.clientMongo
  }
}
