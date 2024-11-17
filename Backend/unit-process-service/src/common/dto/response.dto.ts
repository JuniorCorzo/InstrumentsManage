import { HttpStatus } from "@nestjs/common";
import { WithId } from "mongodb";

export class ResponseDTO<T> {

    constructor(
        private readonly status: HttpStatus,
        private readonly messages: string,
        private readonly data?: WithId<T>[] | WithId<T>
        ) {

    }

    getStatus(): HttpStatus {
        return this.status;
    }

    getData(): WithId<T>[] | WithId<T> {
        return this.data;
    }

    getMessages(): string {
        return this.messages;
    }
}