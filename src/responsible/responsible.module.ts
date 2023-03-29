import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';

@Module({
  providers: [ResponsibleService]
})
export class ResponsibleModule {}
