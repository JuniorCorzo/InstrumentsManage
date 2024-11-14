import { forwardRef, Module } from "@nestjs/common";
import { UnitProcessController } from "../controller/unit-process.controller";
import { UnitProcessService } from "../service/unit-process.service";
import { UnitProcessRepository } from "../repositories/unit-process.repository";
import { AppModule } from "src/app.module";
import { ConnectDB } from "src/common/config/ConnectDB";
import { CommonModule } from "src/common/module/common.module";

@Module({
    imports: [CommonModule],
    controllers: [UnitProcessController],
    providers: [UnitProcessService, UnitProcessRepository],
    
})
export class UnitProcessModule{}