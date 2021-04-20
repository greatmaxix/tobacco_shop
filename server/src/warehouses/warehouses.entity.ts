import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";
import { Products } from "src/products/products.entity";
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouse extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => ProductWarehouse, productWarehouse => productWarehouse.warehouses, { eager: false })
    productWarehouse: Products;
}