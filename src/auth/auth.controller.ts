import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AgencyRegistrationDTO } from '../users/agency/dto/agency-registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/agency')
  async login(@Body() agencyRegistrationDTO: AgencyRegistrationDTO) {
    const agency = await this.authService.validateAgency(
      agencyRegistrationDTO.email,
      agencyRegistrationDTO.password,
    );

    return this.authService.loginAgency(agency);
  }





}
