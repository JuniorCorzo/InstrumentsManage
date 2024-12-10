import { Logger } from '@nestjs/common'
import { setInterval } from 'timers'

export class EurekaConfig {
  // eslint-disable-next-line no-use-before-define
  private static instance: EurekaConfig
  private readonly LOGS = new Logger(EurekaConfig.name, { timestamp: true })
  private readonly EUREKA_URL: string = `http://${process.env.EUREKA_HOST}:8761/eureka/apps`
  private readonly NAME_APP: string = 'UNIT-PROCESS-SERVICE'
  private readonly EUREKA_HOST = process.env.EUREKA_HOST
  private readonly SERVICE_HOST = process.env.SERVICE_HOST

  private readonly EUREKA_INSTANCE = {
    instance: {
      instanceId: `${this.NAME_APP}:${crypto.randomUUID()}`,
      app: this.NAME_APP,
      homePageUrl: `http://${this.SERVICE_HOST}:3000/`,
      statusPageUrl: `http://${this.SERVICE_HOST}:3000/actuator/info`,
      healthCheckUrl: `http://${this.SERVICE_HOST}:3000/actuator/health`,
      hostName: this.SERVICE_HOST,
      ipAddr: process.env.SERVICE_HOST,
      vipAddress: this.NAME_APP,
      lastUpdatedTimestamp: Date.now(),
      lastDirtyTimestamp: Date.now(),
      status: 'UP',
      port: {
        $: 3000,
        '@enabled': true
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
      },
      leaseInfo: {
        renewalIntervalInSecs: 30,
        durationInSecs: 90
      },
      metadata: {
        'management.port': '3000'
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
      }).catch(async () => {
        throw new Error('Failed to register in EurekaService')
      })

      if (response.status === 204) {
        this.LOGS.log('Successfully registered in Eureka')
        this.startHearthBeat()
      }
    } catch (error) {
      this.LOGS.warn(error.message)
      await this.delay(2000)
      return await this.registerEureka()
    }
  }

  private startHearthBeat () {
    const { app, instanceId, leaseInfo } = this.EUREKA_INSTANCE.instance
    setInterval(async () => {
      await fetch(`${this.EUREKA_URL}/${app}/${instanceId}?status=UP`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) throw new Error('Failed to send heartbeat to Eureka')
          this.LOGS.log('Successfully sent heartbeat to Eureka')
        })
        .catch(err => this.LOGS.error(err.message))
    }, leaseInfo.renewalIntervalInSecs * 1000)
  }

  /**
   * Función auxiliar para crear un retraso.
   *
   * @param ms Tiempo en mili segundos para el retraso
   */
  private async delay (ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
