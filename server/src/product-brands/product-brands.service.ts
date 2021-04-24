import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductBrandDto } from 'src/product-brands/dto/create-product-brand.dto';
import { GetProductBrandsFilterDto } from 'src/product-brands/dto/get-product-brands-filter.dto';
import { ProductBrands } from 'src/product-brands/product-brands.entity';
import { ProductBrandsRepository } from 'src/product-brands/product-brands.repository';

@Injectable()
export class ProductBrandsService {
    constructor(
        @InjectRepository(ProductBrandsRepository)
        private productBrandsRepository: ProductBrandsRepository
    ) {}

    async getProductBrands(filterDto: GetProductBrandsFilterDto) : Promise<ProductBrands[]> {
        return this.productBrandsRepository.getProductBrands(filterDto);
    }

    async getProductBrandById(id: number) : Promise<ProductBrands> {
        let found = await this.productBrandsRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Product brand with id "${id}" not found`);
        }
        return found;
    }

    async createProductBrand(createProductBrandDto: CreateProductBrandDto) : Promise<ProductBrands> {
        return this.productBrandsRepository.createProductBrand(createProductBrandDto);
    }

    async deleteProductBrand(id: number) : Promise<void> {
        const { raw, affected }  = await this.productBrandsRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Product brand with id "${id}" not found`);
        }
    }
    async updateProductBrand(id: number, createProductBrandDto: CreateProductBrandDto) : Promise<ProductBrands> {
        let productBrand = await this.getProductBrandById(id);
        const { brand_name, brand_description } = createProductBrandDto;
        productBrand.brand_name = brand_name;
        productBrand.brand_description = brand_description;
        await productBrand.save();
        return productBrand;
    }
}
