import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class WorkflowService {
    constructor(private prisma: PrismaService){}

    // Update function
    async udpateWorkflow(user, updatedWorkflow){
        // Extracting the id 
        const { id } = updatedWorkflow;

        // getting workflow
        const workflow = await this.prisma.workflow.findUnique({
            where: {
                id: id
            }
        });


        // Checking if the workflow is closed
        if((workflow.status === 7 && user.role !== 'SUPERUSER')) return { success: false, message: 'Repair closed'};

        
        // Updating the workflow status
        if((updatedWorkflow.status == 2 || updatedWorkflow.status == 3)  && (user.role == 'TECHNICIAN')){
            const response = await this.prisma.workflow.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    ...updatedWorkflow
                }
            });

            return response;
            
        } 

        if(user.role == 'ADMIN'){
            const response = await this.prisma.workflow.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    ...updatedWorkflow
                }
            });

            return response;
        }

        return {
            success: false,
            message: 'Only Admins and technincians can update the repair'
        }

    };


    async getWorkflows(){
        try {
            const response = this.prisma.workflow.findMany();

            return response;

        } catch (error) {
            console.log(error);
        }
    }
};


