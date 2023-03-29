import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthServiceTourist } from './authTourist.service';
import { LoginAuthTouristDto } from './dto/login-touris-auth.dto';
import { RegisterAuthTouristDto } from './dto/register-touris-auth.dto';


@ApiBearerAuth()
@ApiTags('authTourist')
@Controller('authTourist')           //POST a http://localhost:3000/authTourist
export class AuthControllerTourist {
    constructor(private readonly authService: AuthServiceTourist) {}

    //Register
    @Post('register')
    registerUserTourist(@Body() touristObject: RegisterAuthTouristDto) {
        return this.authService.register(touristObject)
    }

    //Login
    @Post('login')
    loginUserTourist(@Body() touristObjectLogin: LoginAuthTouristDto) {
        console.log('Primero la solicitud llega aquí y luego pasa al service')
        return this.authService.login(touristObjectLogin);
    }
}