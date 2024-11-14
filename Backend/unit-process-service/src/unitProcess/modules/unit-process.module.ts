import { forwardRef, Module } from "@nestjs/common";
import { UnitProcessController } from "../controller/unit-process.controller";
import { UnitProcessService } from "../service/unit-process.service";
import { UnitProcessRepository } from "../repositories/unit-process.repository";
import { AppModule } from "src/app.module";
import { ConnectDB } from "src/shared/config/ConnectDB";
import { CommonModule } from "src/shared/module/common.module";

@Module({
    imports: [forwardRef(() => AppModule), CommonModule],
    controllers: [UnitProcessController],
    providers: [UnitProcessService, UnitProcessRepository],
    
})
export class UnitProcessModule{}