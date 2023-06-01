import {IsNotEmpty } from "class-validator";

export class RepairDto {

    @IsNotEmpty()
    device: string;

    @IsNotEmpty()
    serial_number: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    shopId: number;

    @IsNotEmpty()
    customerId: number;

}
