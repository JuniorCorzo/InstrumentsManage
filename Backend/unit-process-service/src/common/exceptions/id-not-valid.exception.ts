import { HttpException, HttpStatus } from '@nestjs/common'
import { ResponseMessages } from '../enums/response-messages'

export class IdNotValid extends HttpException {
  constructor () {
    super(ResponseMessages.ID_NOT_VALID, HttpStatus.BAD_REQUEST)
  }
}
