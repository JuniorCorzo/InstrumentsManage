import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CampService } from '../services/camp.service'
import { CampValidations } from '../validations/camp.validation'
import { ResponseDTO } from 'src/common/dto/response.dto'
import { CampDTO } from '../dtos/camp.dto'

@Controller('/camp')
export class CampController {
  constructor (private readonly campService: CampService) { }

  @Get('/all')
  public getAllCamps (): Promise<ResponseDTO<CampDTO>> {
    return this.campService.getAllCamps()
  }

  @Get(':id')
  public getCampById (@Param('id', CampValidations) id: string): Promise<ResponseDTO<CampDTO>> {
    return this.campService.getCampById(id)
  }

  @Post('/create')
  public inserCamp (@Body() camp: CampDTO): Promise<ResponseDTO<CampDTO>> {
    return this.campService.insertCamp(camp)
  }

  @Put('/update')
  public updateCamp (@Body(CampValidations) camp: CampDTO): Promise<ResponseDTO<CampDTO>> {
    return this.campService.updateCamp(camp)
  }

  @Delete('/delete/:id')
  public deleteCamp (@Param('id', CampValidations) id: string): Promise<ResponseDTO<CampDTO>> {
    return this.campService.deleteCamp(id)
  }
}
