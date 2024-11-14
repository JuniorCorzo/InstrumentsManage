import { forwardRef, Module } from '@nestjs/common';
import { UnitProcessModule } from './unitProcess/modules/unit-process.module';

@Module({
  imports: [UnitProcessModule],
})
export class AppModule {}
