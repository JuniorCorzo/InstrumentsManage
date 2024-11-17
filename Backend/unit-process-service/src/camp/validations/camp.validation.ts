import { Injectable } from '@nestjs/common'
import { CampRepository } from '../repositories/camp.repository'
import { ObjectId } from 'mongodb'
import { ResponseMessages } from 'src/common/enums/response-messages'
import { IdNotValid } from 'src/common/exceptions/id-not-valid.exception'
import { CampNotFound } from '../exceptions/camp-not-fount.exception'

@Injectable()
export class CampValidations {
  constructor (private readonly campRepository: CampRepository) { }

  private validId (id: string): void {
    try {
      if (!ObjectId.isValid(id)) {
        console.error(ResponseMessages.ID_NOT_VALID)
        throw new IdNotValid()
      }
    } catch (err) {
      console.error(err.message)
      throw new IdNotValid()
    }
  }

  public async validIdExist (id: string) {
    this.validId(id)
    try {
      const isValid = await this.campRepository.existById(id)
      if (isValid) {
        throw new CampNotFound()
      }
    } catch (err) {
      console.error(err)
      throw new CampNotFound()
    }
  }
}
