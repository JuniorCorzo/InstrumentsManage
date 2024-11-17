import { Module } from '@nestjs/common'
import { UnitProcessController } from '../controller/unit-process.controller'
import { UnitProcessService } from '../service/unit-process.service'
import { UnitProcessRepository } from '../repositories/unit-process.repository'
import { CommonModule } from 'src/common/module/common.module'
import { UnitProcessValidations } from '../validations/unit-process.validation'

@Module({
  imports: [CommonModule],
  controllers: [UnitProcessController],
  providers: [UnitProcessService, UnitProcessRepository, UnitProcessValidations]

})
export class UnitProcessModule {}
