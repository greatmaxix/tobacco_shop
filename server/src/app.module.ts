import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ImagesController } from './images/images.controller';
import { ProductBrandsModule } from './product-brands/product-brands.module';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductWarehouseModule } from './product-warehouse/product-warehouse.module';
import { RolesModule } from './roles/roles.module';
import { ShopsModule } from './shops/shops.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StaffModule } from './staff/staff.module';
import { StaffMobilesModule } from './staff-mobiles/staff-mobiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductBrandsModule,
    ProductsModule,
    ProductTypesModule,
    InvoicesModule,
    ProductWarehouseModule,
    WarehousesModule,
    ShopsModule,
    RolesModule,
    StaffModule,
    StaffMobilesModule,
  ],
  controllers: [ImagesController],
})
export class AppModule {}
