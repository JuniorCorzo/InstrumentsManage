import { Injectable } from '@nestjs/common';
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository';
import { UnitProcess } from '../model/unit-process.model';
import { WithId } from 'mongodb';
import { UnitProcessValidations } from '../validations/unit-process.validation';

@Injectable()
export class UnitProcessService {
  constructor(
    private readonly unitProcessRepository: UnitProcessRepository,
    private readonly unitProcessValidation: UnitProcessValidations
  ) { }

  public getAllUnitProcess(): Promise<WithId<UnitProcess>[]> {
    return this.unitProcessRepository.findAll();
  }

  public getUnitProcessById(id: string): Promise<WithId<UnitProcess>> {
    this.unitProcessValidation.validIdByExist(id)
    
    return this.unitProcessRepository.findById(id);
  }

  public insertUnitProcess(unitProcess: UnitProcess): void {
    this.unitProcessRepository.insert(unitProcess)
  }

  public updateUnitProcess(unitProcess: WithId<UnitProcess>): void {
    this.unitProcessValidation.validIdByExist(unitProcess._id.toString())
    
    this.unitProcessRepository.update(unitProcess)
  }

  public deleteUnitProcess(id: string): void {
    this.unitProcessValidation.validIdByExist(id)

    this.unitProcessRepository.delete(id)
  }
}
