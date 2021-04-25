import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductBrandDto } from 'src/product-brands/dto/create-product-brand.dto';
import { GetProductBrandsFilterDto } from 'src/product-brands/dto/get-product-brands-filter.dto';
import { ProductBrands } from 'src/product-brands/product-brands.entity';
import { ProductBrandsService } from 'src/product-brands/product-brands.service';

@Controller('product-brands')
export class ProductBrandsController {
    constructor(private productBrandsService: ProductBrandsService) {};

    @Get()
    getProductBrands(
        filterDto: GetProductBrandsFilterDto,
    ) : Promise<ProductBrands[]> {
        return this.productBrandsService.getProductBrands(filterDto);
    }
    
    @Get('/:id')
    getProductBrandById(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<ProductBrands> {
        return this.productBrandsService.getProductBrandById(id);
    }

    @Post()
    createProductType(
        @Body() createProductBrandDto: CreateProductBrandDto,
    ) : Promise<ProductBrands> {
        return this.productBrandsService.createProductBrand(createProductBrandDto);
    }

    @Delete('/:id')
    deleteProductType(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<void> {
        return this.productBrandsService.deleteProductBrand(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createProductBrandDto: CreateProductBrandDto,
    ) : Promise<ProductBrands> {
        return this.productBrandsService.updateProductBrand(id, createProductBrandDto);
    }
}
