import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from 'src/invoices/invoices.controller';
import { InvoicesRepository } from 'src/invoices/invoices.repository';
import { InvoicesService } from 'src/invoices/invoices.service';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoicesRepository]),
    StaffModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService]
})
export class InvoicesModule {}
