import { HttpStatus, Injectable } from '@nestjs/common'
import { CampRepository } from '../repositories/camp.repository'
import { Camp } from '../model/camp.model'
import { WithId } from 'mongodb'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { ResponseMessages } from 'src/common/enums/response-messages'

@Injectable()
export class CampService {
  constructor (
        private readonly campRepository: CampRepository

  ) {}

  public async getAllCamps (): Promise<ResponseDTO<Camp>> {
    const campData = await this.campRepository.findAll()
    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      campData
    )
  }

  public async getCampById (id: string): Promise<ResponseDTO<Camp>> {
    const campData = await this.campRepository.findById(id)

    return new ResponseDTO<Camp>(
      HttpStatus.OK,
      ResponseMessages.OK,
      [campData]
    )
  }

  public async insertCamp (camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    const dataInsert = await this.campRepository.save(camp)

    return new ResponseDTO(
      HttpStatus.CREATED,
      ResponseMessages.OK,
      [dataInsert]
    )
  }

  public async updateCamp (camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    const dataUpdated = await this.campRepository.save(camp)

    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      [dataUpdated]
    )
  }

  public async deleteCamp (id: string): Promise<ResponseDTO<Camp>> {
    await this.campRepository.delete(id)

    return new ResponseDTO(
      HttpStatus.NO_CONTENT,
      ResponseMessages.DELETE
    )
  }
}
