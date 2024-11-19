import { Injectable, PipeTransform } from '@nestjs/common'
import { CampRepository } from '../repositories/camp.repository'
import { ObjectId } from 'mongodb'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { IdNotValid } from 'src/common/exceptions/id-not-valid.exception'
import { CampNotFound } from '../exceptions/camp-not-fount.exception'
import { Camp } from '../model/camp.model'

@Injectable()
export class CampValidations implements PipeTransform {
  constructor (private readonly campRepository: CampRepository) { }
  async transform (value: string | Camp) {
    await this.validIdExist(this.retriveId(value))

    return value
  }

  private validId (id: string): void {
    if (!ObjectId.isValid(id)) {
      console.error(ResponseMessages.ID_NOT_VALID)
      throw new IdNotValid()
    }
  }

  private async validIdExist (id: string): Promise<void> {
    this.validId(id)
    await this.campRepository.existById(id)
      .then(isValid => { if (isValid) throw new CampNotFound() })
  }

  private retriveId (idRaw: string | Camp): string {
    if (idRaw instanceof Object) return idRaw.id.toString()
    return idRaw
  }
}
