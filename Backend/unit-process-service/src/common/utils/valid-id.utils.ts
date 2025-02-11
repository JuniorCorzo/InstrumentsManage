import { ObjectId } from 'mongodb'
import { ResponseMessages } from '../enums/response-messages'
import { IdNotValid } from '../exceptions/id-not-valid.exception'

export const validateIDFormat = (id: string): void => {
  if (!ObjectId.isValid(id)) {
    console.error(ResponseMessages.ID_NOT_VALID)
    throw new IdNotValid()
  }
}
