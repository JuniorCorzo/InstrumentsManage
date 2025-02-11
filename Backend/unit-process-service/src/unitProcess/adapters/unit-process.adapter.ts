import { CampAdapter } from 'src/camp/adapters/camp-adapter.adapter'
import { UnitProcessDTO } from '../dtos/unit-process.dto'
import { UnitProcessEntity } from '../entity/unit-process.entity'

export class UnitProcessAdapter {
  public static toDTO (processUnitEntity: UnitProcessEntity) {
    const { _id, name, description, camp } = processUnitEntity

    return {
      id: _id,
      name,
      description,
      camp: CampAdapter.toDTO(camp)
    } as UnitProcessDTO
  }

  public static toEntity (processUnitDTO: UnitProcessDTO) {
    const { id, name, description, camp } = processUnitDTO

    return {
      _id: id,
      name,
      description,
      camp: CampAdapter.toEntity(camp)
    } as UnitProcessEntity
  }
}
