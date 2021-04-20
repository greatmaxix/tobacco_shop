import { Products } from "src/products/products.entity";
import { Warehouse } from "src/warehouses/warehouses.entity";
import { BaseEntity, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ProductWarehouse extends BaseEntity {
    @Column()
    quantity: number;

    @ManyToOne(type => Products, products => products.productWarehouse, { eager: false })
    products: Products;

    @ManyToOne(type => Warehouse, warehouses => warehouses.productWarehouse, { eager: false })
    warehouses: Warehouse;
}