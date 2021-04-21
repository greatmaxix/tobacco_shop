import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from 'src/staff/staff.repository';
import { StaffController } from 'src/staff/staff.controller';
import { StaffService } from 'src/staff/staff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffRepository]),
  ],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
