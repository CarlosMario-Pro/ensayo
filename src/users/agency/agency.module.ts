import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AgencyService } from './agency.service';
import { Agency, AgencySchema } from './schema/agency.schema';
import { AgencyController } from './agency.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Agency.name, schema: AgencySchema },
    ]),
  ],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService, MongooseModule],
})
export class AgencyModule {}
