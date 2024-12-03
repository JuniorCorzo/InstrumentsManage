import { Logger } from '@nestjs/common'
import { networkInterfaces } from 'os'

export class EurekaConfig {
  // eslint-disable-next-line no-use-before-define
  private static instance: EurekaConfig
  private readonly LOGS = new Logger(EurekaConfig.name, { timestamp: true })
  private readonly EUREKA_URL: string = `http://${process.env.EUREKA_HOST}:8761/eureka/apps`
  private readonly EUREKA_INSTANCE = {
    instance: {
      app: '  UNIT-PROCESS-SERVICE',
      hostName: process.env.EUREKA_HOST,
      ipAddr: process.env.SERVICE_HOST,
      vipAddress: 'unit-process',
      instanceId: `${process.env.SERVICE_HOST}:3000`,
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
    this.getIpAddress()
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
      }).catch(async () => {
        throw new Error('Failed to register in EurekaService')
      })

      if (response.status === 204) {
        this.LOGS.log('Successfully registered in Eureka')
      }
    } catch (error) {
      this.LOGS.warn(error.message)
      await this.delay(2000)
      return await this.registerEureka()
    }
  }

  private getIpAddress () {
    const net = networkInterfaces()
    console.log(net)
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
