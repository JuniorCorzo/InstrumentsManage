import { Injectable, PipeTransform } from "@nestjs/common";
import { CampRepository } from "../repositories/camp.repository";
import { CampNotFound } from "../exceptions/camp-not-fount.exception";
import { CampDTO } from "../dtos/camp.dto";
import { validateIDFormat } from "src/common/utils/valid-id.utils";

@Injectable()
export class CampValidations implements PipeTransform {
  constructor(private readonly campRepository: CampRepository) {}
  async transform(value: string | CampDTO) {
    await this.validIdExist(this.retrieveId(value));
    return value;
  }

  private async validIdExist(id: string): Promise<void> {
    validateIDFormat(id);
    await this.campRepository.existById(id).then((isValid) => {
      if (!isValid) throw new CampNotFound();
    });
  }

  private retrieveId(idRaw: string | CampDTO): string {
    if (idRaw instanceof Object) return idRaw.id.toString();
    return idRaw;
  }
}
