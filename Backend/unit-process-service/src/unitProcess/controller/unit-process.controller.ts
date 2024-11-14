import { Body, Controller, Get, Post } from '@nestjs/common';
import { UnitProcessService } from '../service/unit-process.service';
import { UnitProcess } from '../model/unit-process.model';

@Controller("/unit-process")
export class UnitProcessController {
  constructor(private readonly unitProcessService: UnitProcessService) {}

  @Get("/all")
  getAllUnitProcess() {
    return this.unitProcessService.getAllUnitProcess();
  }

  @Post("/create")
  insertUnitProcess(@Body() unitProcess: UnitProcess) {
     return this.unitProcessService.insertUnitProcess(unitProcess)
  }
}
