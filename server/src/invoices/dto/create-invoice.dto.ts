import { IsNotEmpty } from 'class-validator';
import { ProductInvoice } from 'src/product-invoice/product-invoice.entity';
import { Products } from 'src/products/products.entity';

export class CreateInvoiceDto {
    // @IsNotEmpty()
    products: Products[];

    productInvoices: ProductInvoice[];

    total_cost: number;
}