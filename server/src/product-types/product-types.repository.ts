import { EntityRepository, Repository } from "typeorm";
import { ProductTypes } from "src/product-types/product-types.entity";

@EntityRepository(ProductTypes)
export class ProductTypesRepository extends Repository<ProductTypes> {
}