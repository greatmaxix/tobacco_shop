import { ProductBrands } from "src/product-brands/product-brands.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProductBrands)
export class ProductBrandsRepository extends Repository<ProductBrands> {
}