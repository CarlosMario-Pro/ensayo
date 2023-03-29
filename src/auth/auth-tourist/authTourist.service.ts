import { RegisterAuthTouristDto } from './dto/register-touris-auth.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tourist, TouristDocument } from '../../tourist/schema/tourist.schema';
import { LoginAuthTouristDto } from './dto/login-touris-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthServiceTourist {
    constructor(
        @InjectModel(Tourist.name) private readonly touristModel: Model<TouristDocument>,
        private jwtService: JwtService
    ) {}


    async register(touristObject: RegisterAuthTouristDto) {
        const { password } = touristObject;                                     //Esto es en texto plano y no es segura
        const plainToHash = await hash(password, 10);                           //Esto enncripta la contraseña
        touristObject = { ...touristObject, password: plainToHash};             //'touristObject' es igual a lo que el traía, pero la propiedad password la sobreescribo con la encriptación seteada en 'plainToHash'
        return this.touristModel.create(touristObject);
    }//POST a http://localhost:3000/authTourist/register con esto: { "firstName": "Carlos", "lastName": "Reyes", "email": "carlos@gmail.com", "phoneNumber": 3002003344, "password": "Carlos..14" }


    async login(touristObjectLogin: LoginAuthTouristDto) {                      //Para hacer un login, necesitamos hacer una consulta a la DB
        const { email, password } = touristObjectLogin;                         //'touristObject' es lo que viene por http://localhost:3000
        console.log({ email, password })
        const findTourist = await this.touristModel.findOne({ email });
        console.log(findTourist)
        if (!findTourist) throw new HttpException('USER_NOT_FOUND', HttpStatus.FORBIDDEN);
        const checkPassword = await compare(password, findTourist.password)

        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);

        const payload = { id: findTourist._id, email: findTourist.email }
        const token = this.jwtService.sign(payload);

        const data = {
            user: findTourist,
            token,
        }
        return data;
    }
}


/*
Creamos el register y el login
Generamos el token de JWT y al hacer el POST a http://localhost:3000/auth/login, obtenemos el token JWT, el cual sirve para aumentar la seguridad
Luego creamos la 'estrategia'
Después el guardián
*/