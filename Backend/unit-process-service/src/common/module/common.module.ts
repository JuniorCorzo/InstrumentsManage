import { Module } from '@nestjs/common'
import { ConnectDB } from '../config/ConnectDB'
import { EurekaConfig } from '../config/EurekaConfig'

@Module({
  providers: [
    {
      provide: ConnectDB,
      useFactory: () => ConnectDB.getInstance()
    },
    {
      provide: EurekaConfig,
      useFactory: () => EurekaConfig.getInstance()
    }
  ],
  exports: [ConnectDB]
})
export class CommonModule {}
