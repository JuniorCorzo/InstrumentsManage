import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { CampRepository } from '../repositories/camp.repository'
import { Camp } from '../model/camp.model'
import { WithId } from 'mongodb'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { ResponseMessages } from 'src/common/enums/response-messages'

@Injectable()
export class CampService {
  private readonly logs = new Logger(CampService.name, { timestamp: true })

  constructor (
        private readonly campRepository: CampRepository

  ) {}

  public async getAllCamps (): Promise<ResponseDTO<Camp>> {
    this.logs.log('[GET] Fetching all camps records from MongoDB')
    const campData = await this.campRepository.findAll()
    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      campData
    )
  }

  public async getCampById (id: string): Promise<ResponseDTO<Camp>> {
    this.logs.log(`[GET] Fetch the camp with record ${id} of MongoDB`)
    const campData = await this.campRepository.findById(id)

    return new ResponseDTO<Camp>(
      HttpStatus.OK,
      ResponseMessages.OK,
      [campData]
    )
  }

  public async insertCamp (camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    this.logs.log('[POST] Inserting new document of camp to MongoDB')
    const dataInsert = await this.campRepository.save(camp)
    this.logs.log('Inserted new camp document is successfully')

    return new ResponseDTO(
      HttpStatus.CREATED,
      ResponseMessages.OK,
      [dataInsert]
    )
  }

  public async updateCamp (camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    this.logs.log(`[PUT] Updating camp document with the id ${camp.id} of MongoDB`)
    const campUpdated = await this.campRepository.save(camp)
    this.logs.log(`Updated camp document with id ${camp.id} is successfully`)

    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      [campUpdated]
    )
  }

  public async deleteCamp (id: string): Promise<ResponseDTO<Camp>> {
    this.logs.log(`[DELETE] Deleting camp document with the id ${id} of MongoDB`)
    await this.campRepository.delete(id)
    this.logs.log(`Deleted camp document with the id ${id} is successfully`)

    return new ResponseDTO(
      HttpStatus.NO_CONTENT,
      ResponseMessages.DELETE
    )
  }
}
