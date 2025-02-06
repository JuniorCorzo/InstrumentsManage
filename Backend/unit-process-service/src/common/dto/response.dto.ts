export class ResponseDTO<T> {
  constructor (
        private readonly status: string,
        private readonly messages: string,
        private readonly data?: T[] | void
  ) {

  }

  getStatus (): string {
    return this.status
  }

  getData (): T[] | void {
    return this.data
  }

  getMessages (): string {
    return this.messages
  }
}
