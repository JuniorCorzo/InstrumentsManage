import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

function loadEnvFile () {
  const envFile = process.env.NODE_ENV === 'development'
    ? '.env'
    : '.env.production'

  process.loadEnvFile(envFile)
}

async function bootstrap () {
  loadEnvFile()
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}
bootstrap()
