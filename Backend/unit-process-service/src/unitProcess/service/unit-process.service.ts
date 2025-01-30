import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository'
import { UnitProcess } from '../model/unit-process.model'
import { WithId } from 'mongodb'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { ResponseDTO } from 'src/common/dto/response.dto'

@Injectable()
export class UnitProcessService {
  private readonly logs = new Logger(UnitProcess.name, { timestamp: true })

  constructor (
    private readonly unitProcessRepository: UnitProcessRepository
  ) {}

  public async getAllUnitProcess (): Promise<ResponseDTO<WithId<UnitProcess>>> {
    this.logs.log('[GET] Fetching all process unit records from MongoDB')
    const data = await this.unitProcessRepository.findAll()
    return new ResponseDTO(
      'OK',
      ResponseMessages.OK,
      data
    )
  }

  public async getUnitProcessById (id: string): Promise<ResponseDTO<UnitProcess>> {
    this.logs.log(`[GET] Fetch the process unit with record ${id} of MongoDB`)
    const data = await this.unitProcessRepository.findById(id)
    return new ResponseDTO(
      'OK',
      ResponseMessages.OK,
      [data]
    )
  }

  public async existById (id: string): Promise<boolean> {
    this.logs.log(`Verify if exist with record ${id} of MongoDB`)
    return await this.unitProcessRepository.existById(id)
  }

  public async insertUnitProcess (unitProcess: UnitProcess): Promise<ResponseDTO<UnitProcess>> {
    this.logs.log('[POST] Inserting new document of process unit of MongoDB')
    const saveInsert = await this.unitProcessRepository.save(unitProcess)
    this.logs.log('Inserted new process unit document is successfully')

    return new ResponseDTO<UnitProcess>(
      HttpStatus.CREATED,
      ResponseMessages.OK,
      [saveInsert]
    )
  }

  public async updateUnitProcess (unitProcess: WithId<UnitProcess>): Promise<ResponseDTO<UnitProcess>> {
    this.logs.log(`[PUT] Updating process unit document with the id ${unitProcess.id} of MongoDB`)
    const unitProcessUpdated = await this.unitProcessRepository.save(unitProcess)
    this.logs.log(`Updated process unit document with id ${unitProcess.id} is successfully`)
    return new ResponseDTO<UnitProcess>(
      HttpStatus.OK,
      ResponseMessages.OK,
      [unitProcessUpdated]
    )
  }

  public async deleteUnitProcess (id: string): Promise<ResponseDTO<UnitProcess>> {
    this.logs.log(`[DELETE] Deleting process unit document with the id ${id} of MongoDB`)
    await this.unitProcessRepository.delete(id)
    this.logs.log(`Deleted process unit document with the id ${id} is successfully`)
    return new ResponseDTO<UnitProcess>(
      HttpStatus.NO_CONTENT,
      ResponseMessages.DELETE
    )
  }
}
