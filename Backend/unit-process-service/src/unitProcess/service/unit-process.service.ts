import { HttpStatus, Injectable } from '@nestjs/common'
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository'
import { UnitProcess } from '../model/unit-process.model'
import { WithId } from 'mongodb'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { ResponseDTO } from 'src/common/dto/response.dto'

@Injectable()
export class UnitProcessService {
  constructor (
    private readonly unitProcessRepository: UnitProcessRepository
  ) {}

  public async getAllUnitProcess (): Promise<ResponseDTO<WithId<UnitProcess>>> {
    const data = await this.unitProcessRepository.findAll()
    return new ResponseDTO(
      'OK',
      ResponseMessages.OK,
      data
    )
  }

  public async getUnitProcessById (id: string): Promise<ResponseDTO<UnitProcess>> {
    const data = await this.unitProcessRepository.findById(id)

    return new ResponseDTO(
      'OK',
      ResponseMessages.OK,
      [data]
    )
  }

  public async existById (id: string): Promise<boolean> {
    return await this.unitProcessRepository.existById(id)
  }

  public async insertUnitProcess (unitProcess: UnitProcess): Promise<ResponseDTO<UnitProcess>> {
    const saveInsert = await this.unitProcessRepository.insert(unitProcess)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.CREATED,
      ResponseMessages.OK,
      [saveInsert]
    )
  }

  public async updateUnitProcess (unitProcess: WithId<UnitProcess>): Promise<ResponseDTO<UnitProcess>> {
    const saveInsert = await this.unitProcessRepository.update(unitProcess)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.OK,
      ResponseMessages.OK,
      [saveInsert]
    )
  }

  public async deleteUnitProcess (id: string): Promise<ResponseDTO<UnitProcess>> {
    await this.unitProcessRepository.delete(id)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.NO_CONTENT,
      ResponseMessages.DELETE
    )
  }
}
