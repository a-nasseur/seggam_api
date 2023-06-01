import { IsEmail, IsEmpty, IsNotEmpty, IsStrongPassword, IsOptional, isInt, isNotEmpty } from "class-validator";

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    first_name: string;

    @IsOptional()
    last_name: string;

    @IsOptional()
    profile_img: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    shopId: number;
}
