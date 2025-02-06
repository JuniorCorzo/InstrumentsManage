import { CampAdapter } from 'src/camp/adapters/camp-adapter.adapter'
import { UnitProcessDTO } from '../dtos/unit-process.dto'
import { UnitProcessEntity } from '../entity/unit-process.entity'

export class UnitProcessAdapter {
  public static toDTO (processUnitEntity: UnitProcessEntity) {
    const { _id, name, camp } = processUnitEntity

    return {
      id: _id,
      name,
      camp: CampAdapter.toDTO(camp)
    } as UnitProcessDTO
  }

  public static toEntity (processUnitDTO: UnitProcessDTO) {
    const { id, name, camp } = processUnitDTO

    return {
      _id: id,
      name,
      camp: CampAdapter.toEntity(camp)
    } as UnitProcessEntity
  }
}
