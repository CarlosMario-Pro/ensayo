import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthTouristDto {
    @IsEmail()
    email: string;

    @MaxLength(12)
    @MinLength(4)
    password: string;
}