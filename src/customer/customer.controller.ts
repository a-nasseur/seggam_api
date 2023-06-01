import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtGuard } from 'src/auth/guards';
import { Customer } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
    constructor(private customerSerivce: CustomerService){};

    @Get()
    getCustomers(){
        return this.customerSerivce.getCustomers();
    };

    @Post()
    createCustomer(@Body() customer: Customer){
        return this.customerSerivce.createCustomer(customer);
    }

    @Get(':id')
    getCustomer(@Param() params: any){
        return this.customerSerivce.getCustomer(params.id);
    };

    @Put('update-customer')
    updateCustomer(@Body() dto){    
        return this.customerSerivce.updateCustomer(dto);
    };

    @Delete('delete-customer/:id')
    deleteCustomer(@Param() params: any){
        return this.customerSerivce.deleteCustomer(params.id);
    }

}
