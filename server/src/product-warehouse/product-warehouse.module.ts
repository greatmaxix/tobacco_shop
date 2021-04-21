import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductWarehouseService } from 'src/product-warehouse/product-warehouse.service';
import { ProductWarehouseController } from 'src/product-warehouse/product-warehouse.controller';
import { ProductWarehouseRepository } from 'src/product-warehouse/product-warehouse.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductWarehouseRepository]),
  ],
  providers: [ProductWarehouseService],
  controllers: [ProductWarehouseController]
})
export class ProductWarehouseModule {}
