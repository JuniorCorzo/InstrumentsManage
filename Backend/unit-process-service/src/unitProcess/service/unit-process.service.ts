import { Injectable, Logger } from '@nestjs/common'
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { UnitProcessAdapter } from '../adapters/unit-process.adapter'
import { UnitProcessDTO } from '../dtos/unit-process.dto'
import { ReasonPhrases } from 'http-status-codes'

@Injectable()
export class UnitProcessService {
  private readonly logs = new Logger(UnitProcessService.name, {
    timestamp: true
  })

  constructor (private readonly unitProcessRepository: UnitProcessRepository) {}

  public async getAllUnitProcess (): Promise<ResponseDTO<UnitProcessDTO>> {
    this.logs.log('[GET] Fetching all process unit records from MongoDB')
    const data = (await this.unitProcessRepository.findAll()).map(
      (unitProcess) => UnitProcessAdapter.toDTO(unitProcess)
    )

    return new ResponseDTO(ReasonPhrases.OK, ResponseMessages.OK, data)
  }

  public async getUnitProcessById (
    id: string
  ): Promise<ResponseDTO<UnitProcessDTO>> {
    this.logs.log(`[GET] Fetch the process unit with record ${id} of MongoDB`)
    const data = UnitProcessAdapter.toDTO(
      await this.unitProcessRepository.findById(id)
    )

    return new ResponseDTO(ReasonPhrases.OK, ResponseMessages.OK, [data])
  }

  public async existById (id: string): Promise<boolean> {
    this.logs.log(`Verify if exist with record ${id} of MongoDB`)
    return await this.unitProcessRepository.existById(id)
  }

  public async insertUnitProcess (
    unitProcess: UnitProcessDTO
  ): Promise<ResponseDTO<UnitProcessDTO>> {
    this.logs.log('[POST] Inserting new document of process unit of MongoDB')
    const saveInsert = UnitProcessAdapter.toDTO(
      await this.unitProcessRepository.save(
        UnitProcessAdapter.toEntity(unitProcess)
      )
    )
    this.logs.log('Inserted new process unit document is successfully')

    return new ResponseDTO<UnitProcessDTO>(
      ReasonPhrases.CREATED,
      ResponseMessages.OK,
      [saveInsert]
    )
  }

  public async updateUnitProcess (
    unitProcess: UnitProcessDTO
  ): Promise<ResponseDTO<UnitProcessDTO>> {
    this.logs.log(
      `[PUT] Updating process unit document with the id ${unitProcess.id} of MongoDB`
    )
    const unitProcessUpdated = UnitProcessAdapter.toDTO(
      await this.unitProcessRepository.save(
        UnitProcessAdapter.toEntity(unitProcess)
      )
    )
    this.logs.log(
      `Updated process unit document with id ${unitProcess.id} is successfully`
    )
    return new ResponseDTO<UnitProcessDTO>(
      ReasonPhrases.OK,
      ResponseMessages.OK,
      [unitProcessUpdated]
    )
  }

  public async deleteUnitProcess (
    id: string
  ): Promise<ResponseDTO<UnitProcessDTO>> {
    this.logs.log(
      `[DELETE] Deleting process unit document with the id ${id} of MongoDB`
    )
    await this.unitProcessRepository.delete(id)
    this.logs.log(
      `Deleted process unit document with the id ${id} is successfully`
    )
    return new ResponseDTO<UnitProcessDTO>(
      ReasonPhrases.NO_CONTENT,
      ResponseMessages.DELETE
    )
  }
}
