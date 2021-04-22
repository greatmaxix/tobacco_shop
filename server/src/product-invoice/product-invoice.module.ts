import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInvoiceController } from 'src/product-invoice/product-invoice.controller';
import { ProductInvoiceRepository } from 'src/product-invoice/product-invoice.repository';
import { ProductInvoiceService } from 'src/product-invoice/product-invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInvoiceRepository]),
  ],
  controllers: [ProductInvoiceController],
  providers: [ProductInvoiceService]
})
export class ProductInvoiceModule {}
