import { ProductBrands } from "src/product-brands/product-brands.entity";
import { ProductTypes } from "src/product-types/product-types.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "src/products/dto/create-product-filter.dto";
import { GetProductsFilterDto } from "src/products/dto/get-products-filter.dto";
import { Products } from "src/products/products.entity";

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {
    async getProducts(filterDto: GetProductsFilterDto) : Promise<Products[]> {
        const { title, product_types_id, product_brands_id } = filterDto;
        const query = this.createQueryBuilder('products');

        if (title) {
            query.andWhere('products.title = :title', { title });
        }

        if (product_types_id) {
            query.andWhere('products.product_types_id = :product_types_id', { product_types_id });
        }

        if (product_brands_id) {
            query.andWhere('products.product_brands_id = :product_brands_id', { product_brands_id });
        }

        query.limit(filterDto.limit ? filterDto.limit : 10);
        query.offset(filterDto.offset ? filterDto.offset : 0);

        const products = await query.getMany();
        return products;
    }

    async createProduct(createProductDto: CreateProductDto, productBrand: ProductBrands, productType: ProductTypes) : Promise<Products> {
        const { title, description, cost } = createProductDto;
        const product = new Products();
        product.title = title;
        product.description = description;
        product.cost = cost;
        product.productBrand = productBrand;
        product.productType = productType;

        await product.save();

        return product;
    }
}