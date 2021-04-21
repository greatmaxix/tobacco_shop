import { Products } from "src/products/products.entity";
import { Warehouses } from "src/warehouses/warehouses.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductWarehouse extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Products, products => products.productWarehouse, { eager: false })
    products: Products;

    @ManyToOne(type => Warehouses, warehouses => warehouses.productWarehouse, { eager: false })
    warehouses: Warehouses;
}