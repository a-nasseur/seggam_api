import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopDto } from 'src/dto/shop.dto';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService){}

    // Create repair Route
    @Post('create-repair')
    createRepair(@Body() dto: ShopDto){
        return this.shopService.createShop(dto);
    };

}
