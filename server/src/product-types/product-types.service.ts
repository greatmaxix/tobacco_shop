import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypes } from 'src/product-types/product-types.entity';
import { ProductTypesRepository } from 'src/product-types/product-types.repository';
import { CreateProductTypeDto } from 'src/product-types/dto/create-product-type.dto';
import { GetProductTypesFilterDto } from 'src/product-types/dto/get-product-types-filter.dto';

@Injectable()
export class ProductTypesService {
    constructor(
        @InjectRepository(ProductTypesRepository)
        private productTypesRepository: ProductTypesRepository
    ) {}

    async getProductTypes(filterDto: GetProductTypesFilterDto) : Promise<ProductTypes[]> {
        return this.productTypesRepository.getProductTypes(filterDto);
    }

    async getProductTypeById(id: number) : Promise<ProductTypes> {
        let found = await this.productTypesRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Product type with id "${id}" not found`);
        }
        return found;
    }

    async createProductType(createProductTypeDto: CreateProductTypeDto) : Promise<ProductTypes> {
        return this.productTypesRepository.createProductType(createProductTypeDto);
    }

    async deleteProductType(id: number) : Promise<void> {
        const { raw, affected }  = await this.productTypesRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Product type with id "${id}" not found`);
        }
    }
    async updateProductType(id: number, createProductTypeDto: CreateProductTypeDto) : Promise<ProductTypes> {
        let productType = await this.getProductTypeById(id);
        const { type } = createProductTypeDto;
        productType.type = type;
        await productType.save();
        return productType;
    }

}
