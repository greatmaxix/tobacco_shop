import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductTypes } from 'src/product-types/product-types.entity';
import { ProductTypesService } from 'src/product-types/product-types.service';
import { CreateProductTypeDto } from 'src/product-types/dto/create-product-type.dto';
import { GetProductTypesFilterDto } from 'src/product-types/dto/get-product-types-filter.dto';

@Controller('product-types')
export class ProductTypesController {
    constructor(private productTypesService: ProductTypesService) {};

    @Get()
    getProductTypes(
        filterDto: GetProductTypesFilterDto,
    ) : Promise<ProductTypes[]> {
        return this.productTypesService.getProductTypes(filterDto);
    }

    @Post()
    createProductType(
        @Body() createProductTypeDto: CreateProductTypeDto,
    ) : Promise<ProductTypes> {
        return this.productTypesService.createProductType(createProductTypeDto);
    }

    @Delete('/:id')
    deleteProductType(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<void> {
        return this.productTypesService.deleteProductType(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createProductTypeDto: CreateProductTypeDto,
    ) : Promise<ProductTypes> {
        return this.productTypesService.updateProductType(id, createProductTypeDto);
    }

}
