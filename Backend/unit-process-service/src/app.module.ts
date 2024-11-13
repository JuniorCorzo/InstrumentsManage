import { Module } from '@nestjs/common';
import { UnitProcessController } from './unitProcess/controller/unit-process.controller';
import { UnitProcessService } from './unitProcess/service/unit-process.service';
import { ConnectDB } from './shared/config/ConnectDB';
import { UnitProcessRepository } from './unitProcess/repositories/unit-process.repository';

@Module({
  imports: [],
  controllers: [UnitProcessController],
  providers: [
    UnitProcessService,
    {
      provide: ConnectDB,
      useFactory: () => ConnectDB.getInstance(),
    },
    UnitProcessRepository
  ],
})
export class AppModule {}
