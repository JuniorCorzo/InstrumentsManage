export class EurekaConfig {
  // eslint-disable-next-line no-use-before-define
  private static instance: EurekaConfig
  private readonly EUREKA_URL: string = 'http://localhost:8761/eureka/apps'
  private readonly eurekaInstance = {
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

  public async registerEureka () {
    const { app } = this.eurekaInstance.instance
    try {
      const response = await fetch(`${this.EUREKA_URL}/${app}`, {
        method: 'POST',
        body: JSON.stringify(this.eurekaInstance),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      if (response.status === 204) {
        console.log('Registrado exitosamente en Eureka')
      } else {
        const errorBody = await response.text()
        throw new Error(`Registro en Eureka FALLÓ: estado: ${response.status} cuerpo: ${errorBody}`)
      }
    } catch (error) {
      console.error('Error al registrar en Eureka :', error.message)
    }
  }
}
