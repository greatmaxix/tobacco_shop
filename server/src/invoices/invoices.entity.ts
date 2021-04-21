import { Products } from "src/products/products.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoices extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand_name: string;

    @Column()
    brand_description: string;

    @ManyToMany(type => Products, products => products.invoices, { eager: false })
    products: Products;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
}