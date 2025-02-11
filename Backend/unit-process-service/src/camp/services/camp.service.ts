import { Injectable, Logger } from "@nestjs/common";
import { CampRepository } from "../repositories/camp.repository";
import { ResponseDTO } from "src/common/dto/response.dto";
import { ResponseMessages } from "src/common/enums/response-messages";
import { CampDTO } from "../dtos/camp.dto";
import { CampAdapter } from "../adapters/camp-adapter.adapter";
import { ReasonPhrases } from "http-status-codes";

@Injectable()
export class CampService {
  private readonly logs = new Logger(CampService.name, { timestamp: true });

  constructor(private readonly campRepository: CampRepository) {}

  public async getAllCamps(): Promise<ResponseDTO<CampDTO>> {
    this.logs.log("[GET] Fetching all camps records from MongoDB");
    const campData = (await this.campRepository.findAll()).map((camp) =>
      CampAdapter.toDTO(camp)
    );

    return new ResponseDTO(ReasonPhrases.OK, ResponseMessages.OK, campData);
  }

  public async getCampById(id: string): Promise<ResponseDTO<CampDTO>> {
    this.logs.log(`[GET] Fetch the camp with record ${id} of MongoDB`);
    const campData = CampAdapter.toDTO(await this.campRepository.findById(id));

    return new ResponseDTO<CampDTO>(
      ReasonPhrases.OK,
      ResponseMessages.OK,
      [campData][campData]
    );
  }

  public async insertCamp(camp: CampDTO): Promise<ResponseDTO<CampDTO>> {
    this.logs.log("[POST] Inserting new document of camp to MongoDB");
    const dataInsert = CampAdapter.toDTO(
      await this.campRepository.save(CampAdapter.toEntity(camp))
    );
    this.logs.log("Inserted new camp document is successfully");

    return new ResponseDTO(
      ReasonPhrases.CREATED,
      ResponseMessages.OK,
      [dataInsert][dataInsert]
    );
  }

  public async updateCamp(camp: CampDTO): Promise<ResponseDTO<CampDTO>> {
    this.logs.log(
      `[PUT] Updating camp document with the id ${camp.id} of MongoDB`
    );
    const campUpdated = CampAdapter.toDTO(
      await this.campRepository.save(CampAdapter.toEntity(camp))
    );
    this.logs.log(`Updated camp document with id ${camp.id} is successfully`);

    return new ResponseDTO(ReasonPhrases.OK, ResponseMessages.OK, [
      campUpdated,
    ]);
  }

  public async deleteCamp(id: string): Promise<ResponseDTO<CampDTO>> {
    this.logs.log(
      `[DELETE] Deleting camp document with the id ${id} of MongoDB`
    );
    await this.campRepository.delete(id);
    this.logs.log(`Deleted camp document with the id ${id} is successfully`);

    return new ResponseDTO(ReasonPhrases.NO_CONTENT, ResponseMessages.DELETE);
  }
}
