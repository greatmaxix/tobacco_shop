import { Invoices } from "src/invoices/invoices.entity";
import { ProductTypes } from "src/product-types/product-types.entity";
import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductBrands } from "../product-brands/product-brands.entity";

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand_name: string;

    @Column()
    brand_description: string;

    @ManyToOne(type => ProductBrands, productBrands => productBrands.products, { eager: false })
    productBrand: ProductBrands;

    @ManyToOne(type => ProductTypes, productTypes => productTypes.products, { eager: false })
    productType: ProductTypes;

    @ManyToMany(type => Invoices, invoices => invoices.products, { eager: false })
    invoices: Invoices;

    @OneToMany(type => ProductWarehouse, productWarehouse => productWarehouse.products, { eager: false })
    productWarehouse: ProductWarehouse;
}