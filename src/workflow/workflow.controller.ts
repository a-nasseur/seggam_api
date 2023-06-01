import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { WorkflowService } from './workflow.service';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('workflow')
export class WorkflowController {
    constructor(private workflowService: WorkflowService){}

    @Put('update-workflow')
    updateWorkflow(@Body() dto, @GetUser() user){
        return this.workflowService.udpateWorkflow(user, dto);
    };

    @Get()
    getWorkflows(){
        return this.workflowService.getWorkflows();
    }
};
