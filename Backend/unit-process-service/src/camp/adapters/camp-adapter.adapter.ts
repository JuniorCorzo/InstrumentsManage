import { CampDTO } from '../dtos/camp.dto'
import { CampEntity } from '../entity/camp.entity'

export class CampAdapter {
  public static toDTO (CampDTO: CampEntity): CampDTO {
    const { _id, name, location } = CampDTO

    return {
      id: _id,
      name,
      location
    } as CampDTO
  }

  public static toEntity (campDTO: CampDTO): CampEntity {
    const { id, name, location } = campDTO

    return {
      _id: id,
      name,
      location
    } as CampEntity
  }
}
