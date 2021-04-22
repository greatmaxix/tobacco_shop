import { EntityRepository, Repository } from "typeorm";
import { ProductInvoice } from "src/product-invoice/product-invoice.entity";

@EntityRepository(ProductInvoice)
export class ProductInvoiceRepository extends Repository<ProductInvoice> {
}