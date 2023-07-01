import {IsNotEmpty } from "class-validator";

export class ShopDto {

    @IsNotEmpty()
    shop_name: string;

    @IsNotEmpty()
    shop_address: string;

}
