import { Injectable } from '@nestjs/common';
import { ShopDto } from 'src/dto/shop.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopService {
    constructor(private prisma: PrismaService){}

    // Create shop
    async createShop(shop: ShopDto){
        try {
            const newShop = await this.prisma.shop.create({
                data: {
                    ...shop
                }
                
            })
        } catch (error) {
            
        }
    }
}
