import { Module } from '@nestjs/common'
import { UnitProcessModule } from './unitProcess/modules/unit-process.module'
import { CampModule } from './camp/modules/camp.module'

@Module({
  imports: [UnitProcessModule, CampModule]
})
export class AppModule {}
