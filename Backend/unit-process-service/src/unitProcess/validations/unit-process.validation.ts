import { Injectable, PipeTransform } from '@nestjs/common'
import { UnitProcessRepository } from '../repositories/unit-process.repository'
import { UnitProcessNotFound } from '../exceptions/unit-process-not-found.exception'
import { UnitProcessDTO } from '../dtos/unit-process.dto'
import { validateIDFormat } from 'src/common/utils/valid-id.utils'

@Injectable()
export class UnitProcessValidations implements PipeTransform {
  constructor (
    private readonly unitProcessRepository: UnitProcessRepository
  ) { }

  async transform (value: UnitProcessDTO | string): Promise<UnitProcessDTO | string> {
    await this.validIdExist(this.retrieveId(value))
    return value
  }

  private async validIdExist (id: string): Promise<void> {
    validateIDFormat(id)
    await this.unitProcessRepository.existById(id)
      .then(isValid => { if (!isValid) throw new UnitProcessNotFound() })
  }

  private retrieveId (idRaw: string | UnitProcessDTO): string {
    if (idRaw instanceof Object) {
      const { id } = idRaw
      return id.toString()
    }
    return idRaw
  }
}
