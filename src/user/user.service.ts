import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class UserService {
    constructor(private prisma: PrismaService){}
    async getUsers(){
        // getting all the users from the database
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return users;
    };

    async getUser(id){
        // getting a unique user from the DB
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if(!user) throw new ForbiddenException('No user under this reference');

        return user;
    }
};