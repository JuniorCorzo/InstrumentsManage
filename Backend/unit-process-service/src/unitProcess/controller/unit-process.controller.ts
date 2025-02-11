import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UnitProcessService } from '../service/unit-process.service'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { UnitProcessValidations } from '../validations/unit-process.validation'
import { UnitProcessDTO } from '../dtos/unit-process.dto'

@Controller('/unit-process')
export class UnitProcessController {
  constructor (
    private readonly unitProcessService: UnitProcessService) { }

  @Get('/all')
  public getAllUnitProcess (): Promise<ResponseDTO<UnitProcessDTO>> {
    return this.unitProcessService.getAllUnitProcess()
  }

  @Get(':id')
  public getUnitProcessById (@Param('id', UnitProcessValidations) id: string): Promise<ResponseDTO<UnitProcessDTO>> {
    return this.unitProcessService.getUnitProcessById(id)
  }

  @Post('/create')
  insertUnitProcess (@Body() unitProcess: UnitProcessDTO): Promise<ResponseDTO<UnitProcessDTO>> {
    return this.unitProcessService.insertUnitProcess(unitProcess)
  }

  @Put('/update')
  public updateUnitProcess (@Body(UnitProcessValidations) unitProcess: UnitProcessDTO): Promise<ResponseDTO<UnitProcessDTO>> {
    return this.unitProcessService.updateUnitProcess(unitProcess)
  }

  @Delete('/delete/:id')
  public deleteUnitProcess (@Param('id', UnitProcessValidations) id: string): Promise<ResponseDTO<UnitProcessDTO>> {
    return this.unitProcessService.deleteUnitProcess(id)
  }
}
