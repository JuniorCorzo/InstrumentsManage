import { HttpStatus } from '@nestjs/common'
import { WithId } from 'mongodb'

export class ResponseDTO<T> {
  constructor (
        private readonly status: HttpStatus | string,
        private readonly messages: string,
        private readonly data?: WithId<T>[] | void
  ) {

  }

  getStatus (): HttpStatus | string {
    return this.status
  }

  getData (): WithId<T>[] | WithId<T> | void {
    return this.data
  }

  getMessages (): string {
    return this.messages
  }
}
