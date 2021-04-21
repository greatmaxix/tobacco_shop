import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesController } from 'src/product-types/product-types.controller';
import { ProductTypesRepository } from 'src/product-types/product-types.repository';
import { ProductTypesService } from 'src/product-types/product-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypesRepository]),
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService]
})
export class ProductTypesModule {}