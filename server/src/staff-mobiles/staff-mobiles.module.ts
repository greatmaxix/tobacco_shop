import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMobilesController } from 'src/staff-mobiles/staff-mobiles.controller';
import { StaffMobilesRepository } from 'src/staff-mobiles/staff-mobiles.repository';
import { StaffMobilesService } from 'src/staff-mobiles/staff-mobiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffMobilesRepository]),
  ],
  controllers: [StaffMobilesController],
  providers: [StaffMobilesService]
})
export class StaffMobilesModule {}
