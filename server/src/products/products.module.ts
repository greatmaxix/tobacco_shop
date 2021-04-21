import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}