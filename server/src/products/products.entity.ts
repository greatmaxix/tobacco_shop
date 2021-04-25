import { Invoices } from "src/invoices/invoices.entity";
import { ProductTypes } from "src/product-types/product-types.entity";
import { ProductWarehouse } from "src/product-warehouse/product-warehouse.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductBrands } from "src/product-brands/product-brands.entity";
import { Images } from "src/images/images.entity";

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    cost: number;

    @ManyToOne(type => ProductBrands, productBrands => productBrands.products, { eager: false })
    productBrand: ProductBrands;

    @ManyToOne(type => ProductTypes, productTypes => productTypes.products, { eager: false })
    productType: ProductTypes;

    @OneToMany(type => Invoices, invoices => invoices.products, { eager: false })
    invoices: Invoices;

    @OneToMany(type => ProductWarehouse, productWarehouse => productWarehouse.products, { eager: false })
    productWarehouse: ProductWarehouse;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @OneToMany(type => Images, images => images.imageables, { eager: false })
    images: Images[];
}