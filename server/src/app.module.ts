import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ImagesController } from './images/images.controller';
import { ProductBrandsModule } from './product-brands/product-brands.module';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductBrandsModule,
    ProductsModule,
    ProductTypesModule,
    InvoicesModule,
  ],
  controllers: [ImagesController],
})
export class AppModule {}
