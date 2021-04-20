import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "../products/products.entity";

@Entity()
export class ProductBrands extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand_name: string;

    @Column()
    brand_description: string;

    @OneToMany(type => Products, product => product.productBrand, { eager: true })
    products: Products[];
}