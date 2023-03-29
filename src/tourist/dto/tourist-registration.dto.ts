import { IsEmail, IsNotEmpty } from 'class-validator';

export class TouristRegistrationDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phoneNumber: number;

    @IsNotEmpty()
    password: string;
}