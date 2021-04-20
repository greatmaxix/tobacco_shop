import { Module } from '@nestjs/common';
import { StaffMobilesController } from './staff-mobiles.controller';
import { StaffMobilesService } from './staff-mobiles.service';

@Module({
  controllers: [StaffMobilesController],
  providers: [StaffMobilesService]
})
export class StaffMobilesModule {}
