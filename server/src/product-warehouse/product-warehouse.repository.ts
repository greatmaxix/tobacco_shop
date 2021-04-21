import { EntityRepository, Repository } from "typeorm";
import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";

@EntityRepository(ProductWarehouse)
export class ProductWarehouseRepository extends Repository<ProductWarehouse> {
}