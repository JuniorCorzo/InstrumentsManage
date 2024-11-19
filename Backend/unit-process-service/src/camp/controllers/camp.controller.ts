import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CampService } from '../services/camp.service'
import { WithId } from 'mongodb'
import { Camp } from '../model/camp.model'
import { CampValidations } from '../validations/camp.validation'
import { ResponseDTO } from 'src/common/dto/response.dto'

@Controller('/camp')
export class CampController {
  constructor (private readonly campService: CampService) { }

  @Get('/all')
  public getAllCamps (): Promise<ResponseDTO<Camp>> {
    return this.campService.getAllCamps()
  }

  @Get(':id')
  public getCampById (@Param('id', CampValidations) id: string): Promise<ResponseDTO<Camp>> {
    return this.campService.getCampById(id)
  }

  @Post('/create')
  public inserCamp (@Body() camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    return this.campService.insertCamp(camp)
  }

  @Put('/update')
  public updateCamp (@Body(CampValidations) camp: WithId<Camp>): Promise<ResponseDTO<Camp>> {
    return this.campService.updateCamp(camp)
  }

  @Delete('/delete/:id')
  public deleteCamp (@Param('id', CampValidations) id: string): Promise<ResponseDTO<Camp>> {
    return this.campService.deleteCamp(id)
  }
}
