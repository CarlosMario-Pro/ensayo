import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthServiceTourist } from './authTourist.service';
import { AuthControllerTourist } from './authTourist.controller';
import { Tourist, TouristSchema } from '../../tourist/schema/tourist.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './jwt.constantes';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Tourist.name,
        schema: TouristSchema
      },
    ]),

    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60m' },    //Expira en '60s', '60m', '60h'
    }),
  ],
  controllers: [AuthControllerTourist],
  providers: [AuthServiceTourist, JwtStrategy]
})
export class AuthTouristModule {}
