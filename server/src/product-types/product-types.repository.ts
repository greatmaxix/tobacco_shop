import { EntityRepository, Repository } from "typeorm";
import { ProductTypes } from "src/product-types/product-types.entity";
import { GetProductTypesFilterDto } from "./dto/get-product-types-filter.dto";
import { CreateProductTypeDto } from "./dto/create-product-type.dto";

@EntityRepository(ProductTypes)
export class ProductTypesRepository extends Repository<ProductTypes> {
    async getProductTypes(filterDto: GetProductTypesFilterDto) : Promise<ProductTypes[]> {
        const { ids, type } = filterDto;
        const query = this.createQueryBuilder('product_types');

        if (ids) {
            query.andWhereInIds(ids);
        }

        if (type) {
            query.andWhere('product_types.type = :type', { type });
        }
        
        const productTypes = await query.getMany();
        return productTypes;
    }

    async createProductType(createProductTypeDto: CreateProductTypeDto) : Promise<ProductTypes> {
        const { type } = createProductTypeDto;
        const productType = new ProductTypes();
        productType.type = type;

        await productType.save();

        return productType;
    }
}