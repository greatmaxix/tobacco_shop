import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrandsController } from 'src/product-brands/product-brands.controller';
import { ProductBrandsRepository } from 'src/product-brands/product-brands.repository';
import { ProductBrandsService } from 'src/product-brands/product-brands.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductBrandsRepository]),
  ],
  controllers: [ProductBrandsController],
  providers: [ProductBrandsService]
})
export class ProductBrandsModule {}
