import { Body, Controller, Post, UseGuards, Get, Put, Delete, Param } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards";
import { RepairService } from "./repair.service";
import { RepairDto } from "src/dto/repair.dto";


// @UseGuards(JwtGuard)
@Controller('repairs')
export class RepairController {
    // Getting the services
    constructor(private repairService: RepairService){}

    // Create repair Route
    @Post('create-repair')
    createRepair(@Body() dto: RepairDto){
        return this.repairService.createRepair(dto);
    };

    @Get()
    getRepairs(){
        return this.repairService.getRepairs();
    }


    @Put('update-repair')
    updateRepair(@Body() dto){
        return this.repairService.updateRepair(dto);
    }

    
    @Delete('delete-repair/:id')
    deleteRepair(@Param() params: any){
        return this.repairService.deleteRepair(params.id);
    };



}