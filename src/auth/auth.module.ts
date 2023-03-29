import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AgencyModule } from 'src/users/agency/agency.module';
import { AgencyService } from 'src/users/agency/agency.service';

@Module({
  imports: [
    AgencyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secreti',
      signOptions: { expiresIn: '34400s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AgencyService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
