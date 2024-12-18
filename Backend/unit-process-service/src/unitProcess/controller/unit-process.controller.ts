import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UnitProcessService } from '../service/unit-process.service'
import { UnitProcess } from '../model/unit-process.model'
import { WithId } from 'mongodb'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { UnitProcessValidations } from '../validations/unit-process.validation'

@Controller('/unit-process')
export class UnitProcessController {
  constructor (
    private readonly unitProcessService: UnitProcessService) { }

  @Get('/all')
  public getAllUnitProcess (): Promise<ResponseDTO<WithId<UnitProcess>>> {
    return this.unitProcessService.getAllUnitProcess()
  }

  @Get(':id')
  public getUnitProcessById (@Param('id', UnitProcessValidations) id: string): Promise<ResponseDTO<WithId<UnitProcess>>> {
    return this.unitProcessService.getUnitProcessById(id)
  }

  @Post('/create')
  insertUnitProcess (@Body() unitProcess: UnitProcess): Promise<ResponseDTO<WithId<UnitProcess>>> {
    return this.unitProcessService.insertUnitProcess(unitProcess)
  }

  @Put('/update')
  public updateUnitProcess (@Body(UnitProcessValidations) unitProcess: WithId<UnitProcess>): Promise<ResponseDTO<WithId<UnitProcess>>> {
    return this.unitProcessService.updateUnitProcess(unitProcess)
  }

  @Delete('/delete/:id')
  public deleteUnitProcess (@Param('id', UnitProcessValidations) id: string): Promise<ResponseDTO<UnitProcess>> {
    return this.unitProcessService.deleteUnitProcess(id)
  }
}
