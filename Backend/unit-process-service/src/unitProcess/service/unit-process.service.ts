import { Injectable } from '@nestjs/common';
import { UnitProcessRepository } from 'src/unitProcess/repositories/unit-process.repository';

@Injectable()
export class UnitProcessService {
  constructor (private readonly unitProccesRepository: UnitProcessRepository){}
  getAllUnitProcess(){
    return this.unitProccesRepository.findAll();
  }
}
