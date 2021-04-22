import { Invoices } from "src/invoices/invoices.entity";
import { Products } from "src/products/products.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductInvoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Products, products => products.invoices, { eager: false })
    products: Products;

    @ManyToOne(type => Invoices, invoices => invoices.products, { eager: false })
    invoices: Invoices;
}