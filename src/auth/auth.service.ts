import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";

// Const imports
const bcrypt = require('bcrypt');



@Injectable({})
export class AuthService {
    // Pass service to constructor
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}

    // User registration function
    async signUp(user: User) {
        // extracting password for hashing
        let { password } = user;

        try {     
            // New user to be added and password needs hashing | replacing password with hash
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);


            // Inserting User with hashed password to Database
            let newUser = await this.prisma.user.create({
                data: user
            });


            const token =  await this.generateToken(newUser);


            return {
                success: true,
                access_token: token
            }

            } catch (error) {
                    if(error.code === 'P2002'){
                        throw new ForbiddenException('This email is already registered');
                    }

                throw error;
            }

    }
        
        
    async signIn(credentials: AuthDto) {
        // checking the user in DB
        const user = await this.prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        });


        if(!user) throw new ForbiddenException('Incorrect credentials');


        const match =  this.compare(credentials.password, user.password);

        
        if(!match) {
            throw new ForbiddenException('Incorrect Credentials');
        }

        const token = await this.generateToken(user);


        return {
            success: true,
            access_token: token
        }
    };



    generateToken(user: AuthDto): Promise<string> {
        return this.jwt.signAsync(user, {
            expiresIn: '60m',
            secret: this.config.get('JWT_SECRET')
        });
    };



    /** Compare stored password with new encrypted password */
    compare(password, encrypted): Promise<boolean> {
        const response = bcrypt.compare(password, encrypted);
        return response;
    }
};