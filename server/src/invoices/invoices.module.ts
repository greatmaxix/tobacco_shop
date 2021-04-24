import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from 'src/invoices/invoices.controller';
import { InvoicesRepository } from 'src/invoices/invoices.repository';
import { InvoicesService } from 'src/invoices/invoices.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([InvoicesRepository]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService]
})
export class InvoicesModule {}
