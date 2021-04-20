import { Products } from "src/products/products.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductTypes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(type => Products, product => product.productType, { eager: true })
    products: Products[];
}