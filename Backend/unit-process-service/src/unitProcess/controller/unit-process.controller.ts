import { Controller, Get } from '@nestjs/common';
import { UnitProcessService } from '../service/unit-process.service';

@Controller("/unit-process")
export class UnitProcessController {
  constructor(private readonly unitProcessService: UnitProcessService) {}

  @Get("/all")
  getAllUnitProcess() {
    return this.unitProcessService.getAllUnitProcess();
  }
}
