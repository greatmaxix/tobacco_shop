import { ProductBrands } from "src/product-brands/product-brands.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductBrandDto } from "src/product-brands/dto/create-product-brand.dto";
import { GetProductBrandsFilterDto } from "src/product-brands/dto/get-product-brands-filter.dto";

@EntityRepository(ProductBrands)
export class ProductBrandsRepository extends Repository<ProductBrands> {
    async getProductBrands(filterDto: GetProductBrandsFilterDto) : Promise<ProductBrands[]> {
        console.log(filterDto);
        const ids = filterDto ? filterDto.ids : null;
        const brand_name = filterDto ? filterDto.brand_name : null;
        const brand_description = filterDto ? filterDto.brand_description : null;
        const query = this.createQueryBuilder('product_brands');

        if (ids) {
            query.andWhereInIds(ids);
        }

        if (brand_name) {
            query.andWhere('product_brands.brand_name = :brand_name', { brand_name });
        }

        if (brand_description) {
            query.andWhere('product_brands.brand_description = :brand_description', { brand_description });
        }
        
        const productBrands = await query.getMany();
        return productBrands;
    }

    async createProductBrand(createProductBrandDto: CreateProductBrandDto) : Promise<ProductBrands> {
        const { brand_name, brand_description } = createProductBrandDto;
        const productBrand = new ProductBrands();
        productBrand.brand_name = brand_name;
        productBrand.brand_description = brand_description;

        await productBrand.save();

        return productBrand;
    }
}