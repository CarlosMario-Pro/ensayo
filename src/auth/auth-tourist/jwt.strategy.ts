import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstant } from './jwt.constantes';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {               //Esto quiere decir que Passport va a plicar la estrategia de JWT
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),       //Extrae el JWT del header
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret,                                //Esto es para cerciorarse de que el token fue generado por el Backend
        });
    }

    async validate(payload: any) {                                          //Del payload usado en el 'auth.service.ts, solo extremos el id y el name que se desencriptaron para usar esos datos                                        //Función de validad que se pasa en el controller
        return { touristId: payload.id, name: payload.name };               //
    }
}