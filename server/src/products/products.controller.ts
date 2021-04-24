import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GetProductBrand } from 'src/product-brands/get-product-brand.decorator';
import { ProductBrands } from 'src/product-brands/product-brands.entity';
import { GetProductType } from 'src/product-types/get-product-type.decorator';
import { ProductTypes } from 'src/product-types/product-types.entity';
import { CreateProductDto } from './dto/create-product-filter.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {};

    @Get()
    getProducts(
        filterDto: GetProductsFilterDto,
    ) : Promise<Products[]> {
        return this.productsService.getProducts(filterDto);
    }

    @Post()
    createProduct(
        @Body() createProductDto: CreateProductDto,
        @GetProductBrand() productBrand: ProductBrands,
        @GetProductType() productType: ProductTypes,
    ) : Promise<Products> {
        return this.productsService.createProduct(createProductDto, productBrand, productType);
    }

    @Delete('/:id')
    deleteProduct(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<void> {
        return this.productsService.deleteProduct(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createProductDto: CreateProductDto,
        @GetProductBrand() productBrand: ProductBrands,
        @GetProductType() productType: ProductTypes,
    ) : Promise<Products> {
        return this.productsService.updateProduct(id, createProductDto, productBrand, productType);
    }
}