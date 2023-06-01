import { Injectable } from "@nestjs/common";
import { RepairDto } from "src/dto/repair.dto";
import { PrismaService } from "src/prisma/prisma.service";

const _ = require('lodash');

@Injectable({})
export class RepairService {
    constructor(private prisma: PrismaService){}

    async createRepair(repair: RepairDto){
        // creating a repair 

        // Declaring a new workflow
        const workflow = {
            status: 1,
            note: 'waiting for technincian acceptance'
        }
        
        try {
            // Entring new repair to database with creating a workflow base entry
            const newRepair = await this.prisma.repair.create({
                data: {
                    ...repair,
                    workflow: {
                        create: workflow
                    }
                },
                include: {
                    workflow: true,
                    shop: true,
                    createdBy: true
                }  
            });

            // Fitlering the repair
            const filterRepair = _.pick(newRepair, ['id', 'device', 'serial_number', 'brand', 'description']);

            // Filtering the user
            const createdBy = _.pick(newRepair.createdBy, ['id', 'first_name', 'last_name', 'profile_img', 'email', 'role', 'createdAt', 'updatedAt']);

            // returning the object
            const response =  {
                ...filterRepair,
                workflow: newRepair.workflow,
                shop: newRepair.shop,
                createdBy: createdBy
            };

            return response;
            
        } catch (error) {
            console.log(error);
        }
       
    }

    async getRepairs(){
        // Getting all repairs data from db
        try {
            const repairs = await this.prisma.repair.findMany({
                include: {
                    workflow: true,
                    shop: true,
                    createdBy: true
                }
            });

            const response = repairs.map(elem => {
                const repairs = _.pick(elem, ['id', 'device', 'serial_number', 'brand', 'description']);
                const createdBy = _.pick(elem.createdBy, ['id', 'first_name', 'last_name', 'profile_img', 'email', 'role', 'createdAt', 'updatedAt'])

                return {
                    ...repairs,
                    workflow: elem.workflow,
                    shop: elem.shop,
                    createdBy: createdBy
                }
            });

            return response;

            
        } catch (error) {
            console.log(error)
        }
    };


    async updateRepair(updatedRepair){
        // updating the repair object from the database

        const { id } = updatedRepair;

        try {
            const response = await this.prisma.repair.update({
               where: {
                id: parseInt(id)
               },
               data: {
                 ...updatedRepair
               }
            });

            return response;
            
        } catch (error) {
            console.log(error);
        }
    };


    async deleteRepair(id){
        // updating the repair object from the database

        try {
            const response = await this.prisma.repair.delete({
               where: {
                id: parseInt(id)
               },
            });

            return {
                success: true, 
                message: 'Repair deleted successfully'
            };
            
        } catch (error) {
            console.log(error);
        }
    };

}