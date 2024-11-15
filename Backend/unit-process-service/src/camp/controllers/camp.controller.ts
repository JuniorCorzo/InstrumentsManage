import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CampService } from "../services/camp.service";
import { WithId } from "mongodb";
import { Camp } from "../model/camp.model";

@Controller('/camp')
export class CampController {
    constructor(private readonly campService: CampService) { }

    @Get('/all')
    getAllCamps(){
        return this.campService.getAllCamps()
    }

    @Get(':id')
    getCampById(@Param('id') id: string) {
        return this.campService.getCampById(id)
    }

    @Post('/create')
    inserCamp(@Body() camp: WithId<Camp>) {
        return this.campService.insertCamp(camp)
    }

    @Put('/update')
    updateCamp(@Body() camp: WithId<Camp>){
        return this.campService.updateCamp(camp)
    }

    @Delete('/delete/:id')
    deleteCamp(@Param('id') id: string) {
        return this.campService.deleteCamp(id)
    }
}