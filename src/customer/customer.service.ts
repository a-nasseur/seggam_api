import { ForbiddenException, Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class CustomerService {
    constructor(private prisma: PrismaService){}

    async getCustomers(){
        try {
            const customers = this.prisma.customer.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return customers;

        } catch (error) {
            console.log(error);
        };
    }


    async createCustomer(customer: Customer){
        // Creating the customer 
        try {
            const newCustomer = await this.prisma.customer.create({
                data: customer
            });

            return newCustomer;

        } catch (error) {
            console.log(error);
        }
    }


    async getCustomer(id){
        // getting a unique user from the DB
        const customer = await this.prisma.customer.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if(!customer) throw new ForbiddenException('No customer under this reference');

        return customer;
    }


    async updateCustomer(updatedCustomer){
        // updating the repair object from the database

        const { id } = updatedCustomer;

        try {
            const response = await this.prisma.customer.update({
               where: {
                id: parseInt(id)
               },
               data: {
                 ...updatedCustomer
               }
            });

            return response;
            
        } catch (error) {
            console.log(error);
        }
    };

    async deleteCustomer(id){
        // deleting the customer object from the database

        try {
            const response = await this.prisma.customer.delete({
               where: {
                id: parseInt(id)
               },
            });

            return {
                success: true, 
                message: 'Customer deleted successfully'
            };
            
        } catch (error) {
            console.log(error);
        }
    };
};
