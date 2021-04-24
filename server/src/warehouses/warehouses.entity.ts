import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";
import { Products } from "src/products/products.entity";
import { Shops } from "src/shops/shops.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouses extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @OneToMany(type => ProductWarehouse, productWarehouse => productWarehouse.warehouses, { eager: false })
    productWarehouse: Products;

    @OneToMany(type => Shops, shops => shops.warehouses, { eager: false })
    shops: Shops[];
}