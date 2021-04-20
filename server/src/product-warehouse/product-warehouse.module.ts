import { Module } from '@nestjs/common';
import { ProductWarehouseService } from './product-warehouse.service';
import { ProductWarehouseController } from './product-warehouse.controller';

@Module({
  providers: [ProductWarehouseService],
  controllers: [ProductWarehouseController]
})
export class ProductWarehouseModule {}
