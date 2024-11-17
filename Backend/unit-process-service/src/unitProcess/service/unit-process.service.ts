import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository';
import { UnitProcess } from '../model/unit-process.model';
import { WithId } from 'mongodb';
import { UnitProcessValidations } from '../validations/unit-process.validation';
import { ResponseMessages } from 'src/common/enums/response-messages';
import { ResponseDTO } from 'src/common/dto/response.dto';


@Injectable()
export class UnitProcessService {
  constructor(
    private readonly unitProcessRepository: UnitProcessRepository,
    private readonly unitProcessValidation: UnitProcessValidations
  ) { }

  public async getAllUnitProcess(): Promise<ResponseDTO<WithId<UnitProcess>>> {
    const data = await this.unitProcessRepository.findAll()

    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      data
    );
  }

  public async getUnitProcessById(id: string): Promise<ResponseDTO<UnitProcess>> {
    await this.unitProcessValidation.validIdExist(id)
    const data = await this.unitProcessRepository.findById(id)

    return new ResponseDTO(
      HttpStatus.OK,
      ResponseMessages.OK,
      data
    )
  }

  //TODO:: Devolver la unidad creada
  public async insertUnitProcess(unitProcess: UnitProcess): Promise<ResponseDTO<UnitProcess>> {
    this.unitProcessRepository.insert(unitProcess)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.CREATED,
      ResponseMessages.OK
    )
  }

  //TODO:: Devolver la unidad actualizada
  public async updateUnitProcess(unitProcess: WithId<UnitProcess>): Promise<ResponseDTO<UnitProcess>> {
    await this.unitProcessValidation.validIdExist(unitProcess._id.toString())
    await this.unitProcessRepository.update(unitProcess)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.OK,
      ResponseMessages.OK
    )
  }

  public async deleteUnitProcess(id: string): Promise<ResponseDTO<UnitProcess>> {
    await this.unitProcessValidation.validIdExist(id)
    await this.unitProcessRepository.delete(id)

    return new ResponseDTO<UnitProcess>(
      HttpStatus.OK,
      ResponseMessages.OK
    )
  }
}
