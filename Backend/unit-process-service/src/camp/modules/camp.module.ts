import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/module/common.module";
import { CampRepository } from "../repositories/camp.repository";

@Module({
    imports: [CommonModule],
    providers: [CampRepository]
})
export class CampModule{}