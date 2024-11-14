import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UnitProcessService } from '../service/unit-process.service';
import { UnitProcess } from '../model/unit-process.model';
import { runInThisContext } from 'vm';
import { WithId } from 'mongodb';

@Controller("/unit-process")
export class UnitProcessController {
  constructor(private readonly unitProcessService: UnitProcessService) {}

  @Get("/all")
  public getAllUnitProcess() {
    return this.unitProcessService.getAllUnitProcess();
  }

  @Get(':id')
  public getUnitProcessById(@Param('id') id: string){
    return this.unitProcessService.getUnitProcessById(id)
  }

  @Post("/create")
  insertUnitProcess(@Body() unitProcess: UnitProcess) {
     return this.unitProcessService.insertUnitProcess(unitProcess)
  }

  @Put('/update')
  public updateUnitProcess(@Body() unitProcess: WithId<UnitProcess>) {
    return this.unitProcessService.updateUnitProcess(unitProcess)
  }

  @Delete('/delete/:id')
  public deleteUnitProcess(@Param('id') id: string) {
    
    this.unitProcessService.deleteUnitProcess(id)
  }
}

