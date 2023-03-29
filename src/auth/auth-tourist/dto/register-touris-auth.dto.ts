import { PartialType } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { LoginAuthTouristDto } from './login-touris-auth.dto';


// export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
export class RegisterAuthTouristDto extends PartialType(LoginAuthTouristDto) {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(4)
    @MinLength(12)
    password: string;
}
