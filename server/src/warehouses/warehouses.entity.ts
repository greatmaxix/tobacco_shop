import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";
import { Products } from "src/products/products.entity";
import { Shops } from "src/shops/shops.entity";
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouses extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => ProductWarehouse, productWarehouse => productWarehouse.warehouses, { eager: false })
    productWarehouse: Products;

    @OneToMany(type => Shops, shop => shop.warehouses, { eager: false })
    shop: Shops;
}