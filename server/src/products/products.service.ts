import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBrands } from 'src/product-brands/product-brands.entity';
import { ProductTypes } from 'src/product-types/product-types.entity';
import { CreateProductDto } from './dto/create-product-filter.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Products } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsRepository)
        private productsRepository: ProductsRepository
    ) {}

    async getProducts(filterDto: GetProductsFilterDto) : Promise<Products[]> {
        return this.productsRepository.getTasks(filterDto);
    }

    async getProductById(id: number) : Promise<Products> {
        let found = await this.productsRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Product with id "${id}" not found`);
        }
        return found;
    }

    async createProduct(createProductDto: CreateProductDto, productBrand: ProductBrands, productType: ProductTypes) : Promise<Products> {
        return this.productsRepository.createProduct(createProductDto, productBrand, productType);
    }

    async deleteProduct(id: number) : Promise<void> { 
        const { raw, affected }  = await this.productsRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Product with id "${id}" not found`);
        }
    }

    async updateProduct(id: number, createProductDto: CreateProductDto, productBrand: ProductBrands, productType: ProductTypes) : Promise<Products> {
        let product = await this.getProductById(id);
        const { title, description, cost } = createProductDto;
        product.title = title;
        product.description = description;
        product.cost = cost;
        product.productBrand = productBrand;
        product.productType = productType;
        await product.save();
        return product;
    }
}
