import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RepairModule } from './repair/repair.module';
import { ShopModule } from './shop/shop.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WorkflowModule } from './workflow/workflow.module';
import { CustomerModule } from './customer/customer.module';


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    RepairModule, 
    ShopModule, 
    PrismaModule, 
    WorkflowModule, CustomerModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
