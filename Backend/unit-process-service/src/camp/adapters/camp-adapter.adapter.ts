import { CampDTO } from '../dtos/camp.dto'
import { CampEntity } from '../entity/camp.entity'

export class CampAdapter {
  public static toDTO (CampDTO: CampEntity): CampDTO {
    const { _id, name } = CampDTO

    return {
      id: _id,
      name
    } as CampDTO
  }

  public static toEntity (campDTO: CampDTO): CampEntity {
    const { id, name } = campDTO

    return {
      _id: id,
      name
    } as CampEntity
  }
}
