import { Controller, ForbiddenException, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { JwtGuard } from "src/auth/guards";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getUsers(@GetUser() user: User){
        return this.userService.getUsers();
    };

    @Get(':id')
    getUser(@Param() params: any){
        return this.userService.getUser(params.id);
    }


};
