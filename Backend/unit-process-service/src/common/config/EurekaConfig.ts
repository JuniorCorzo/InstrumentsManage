import { Logger } from '@nestjs/common'

export class EurekaConfig {
  // eslint-disable-next-line no-use-before-define
  private static instance: EurekaConfig
  private readonly LOGS = new Logger(EurekaConfig.name, { timestamp: true })
  private readonly EUREKA_URL: string = 'http://localhost:8761/eureka/apps'
  private readonly EUREKA_INSTANCE = {
    instance: {
      app: 'UnitProcessService',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      vipAddress: 'unit-process',
      instanceId: 'localhost:3000',
      status: 'UP',
      port: {
        $: 3000,
        '@enabled': true
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
      }
    }
  }

  private constructor () {
    this.registerEureka()
  }

  public static getInstance (): EurekaConfig {
    if (!EurekaConfig.instance) { EurekaConfig.instance = new EurekaConfig() }
    return EurekaConfig.instance
  }

  /**
   * Realiza el registro del servicio en EurekaService de forma asíncrona usando
   * recursividad
   *
   * TODO:: Añadir endpoints de status y health
   * @returns
   */
  private async registerEureka () {
    const { app } = this.EUREKA_INSTANCE.instance
    try {
      const response = await fetch(`${this.EUREKA_URL}/${app}`, {
        method: 'POST',
        body: JSON.stringify(this.EUREKA_INSTANCE),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      if (response.status === 204) {
        this.LOGS.log('Registrado exitosamente en Eureka')
        return
      }

      const errorBody = await response.text()
      throw new Error(`Registro en Eureka FALLÓ: estado: ${response.status} cuerpo: ${errorBody}`)
    } catch (error) {
      this.LOGS.error(error.message)
      await this.delay(2000)
      return await this.registerEureka()
    }
  }

  /**
   * Función auxiliar para crear un retraso.
   *
   * @param ms Tiempo en milisegundos para el retraso
   */
  private async delay (ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
