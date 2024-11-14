import { forwardRef, Module } from '@nestjs/common';
import { UnitProcessController } from './unitProcess/controller/unit-process.controller';
import { UnitProcessService } from './unitProcess/service/unit-process.service';
import { ConnectDB } from './shared/config/ConnectDB';
import { UnitProcessRepository } from './unitProcess/repositories/unit-process.repository';
import { UnitProcessModule } from './unitProcess/modules/unit-process.module';

@Module({
  imports: [UnitProcessModule],
})
export class AppModule {}
