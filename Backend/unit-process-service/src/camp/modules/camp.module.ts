import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/module/common.module";

@Module({
    imports: [CommonModule]
})
export class CampModule{}