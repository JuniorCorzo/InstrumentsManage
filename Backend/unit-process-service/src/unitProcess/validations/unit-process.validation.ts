import { Injectable, PipeTransform } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { IdNotValid } from 'src/common/exceptions/id-not-valid.exception'
import { UnitProcessRepository } from '../repositories/unit-process.repository'
import { UnitProcessNotFound } from '../exceptions/unit-process-not-found.exception'
import { UnitProcess } from '../model/unit-process.model'

@Injectable()
export class UnitProcessValidations implements PipeTransform {
  constructor (
    private readonly unitProcessRepository: UnitProcessRepository
  ) { }

  async transform (value: UnitProcess | string): Promise<UnitProcess | string> {
    await this.validIdExist(this.retrieveId(value))
    return value
  }

  // TODO:: Extraer metodo debido a que se llama uno igual en CampValidations
  private validId (id: string): void {
    if (!ObjectId.isValid(id)) {
      console.error(ResponseMessages.ID_NOT_VALID)
      throw new IdNotValid()
    }
  }

  private async validIdExist (id: string): Promise<void> {
    this.validId(id)
    await this.unitProcessRepository.existById(id)
      .then(isValid => { if (isValid) throw new UnitProcessNotFound() })
  }

  private retrieveId (idRaw: string | UnitProcess): string {
    if (idRaw instanceof Object) { return idRaw._id.toString() }
    return idRaw
  }
}
