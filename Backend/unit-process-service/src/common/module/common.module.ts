import { Module } from "@nestjs/common";
import { ConnectDB } from "../config/ConnectDB";

@Module({
    providers: [{
        provide: ConnectDB,
        useFactory: () => ConnectDB.getInstance()
    }],
    exports: [ConnectDB]
})
export class CommonModule{}