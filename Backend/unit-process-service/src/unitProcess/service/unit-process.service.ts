import { Injectable } from '@nestjs/common';
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository';
import { UnitProcess } from '../model/unit-process.model';
import { WithId } from 'mongodb';

@Injectable()
export class UnitProcessService {
  constructor (private readonly unitProccesRepository: UnitProcessRepository){}

  public getAllUnitProcess(): Promise<WithId<UnitProcess>[]> {
    return this.unitProccesRepository.findAll();
  }

  public getUnitProcessById(id: string): Promise<WithId<UnitProcess>> {
    return this.unitProccesRepository.findById(id);
  }

  public insertUnitProcess(unitProcess: UnitProcess): void {
    this.unitProccesRepository.insert(unitProcess)
  }

  public updateUnitProcess(unitProcess: UnitProcess) : void {
    this.unitProccesRepository.update(unitProcess)
  }

  public deleteUnitProcess(id: string): void {
    this.unitProccesRepository.delete(id)
  }
}
