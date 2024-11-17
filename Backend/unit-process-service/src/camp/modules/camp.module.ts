import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/module/common.module";
import { CampRepository } from "../repositories/camp.repository";
import { CampController } from "../controllers/camp.controller";
import { CampService } from "../services/camp.service";
import { CampValidations } from "../validations/camp.validation";

@Module({
    imports: [CommonModule],
    controllers: [CampController],
    providers: [CampRepository, CampService, CampValidations]
})
export class CampModule{}