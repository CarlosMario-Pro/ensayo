import { Controller, Post, Request } from '@nestjs/common';
import { AgencyRegistrationDTO } from './dto/agency-registration.dto';
import { AgencyService } from './agency.service';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post('register')
  async register(
    @Request() req: AgencyRegistrationDTO,
  ): Promise<AgencyRegistrationDTO> {
    return await this.agencyService.create(req);
  }
}
