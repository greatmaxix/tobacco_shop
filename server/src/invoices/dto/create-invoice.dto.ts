import { IsNotEmpty } from 'class-validator';
import { Products } from 'src/products/products.entity';

export class CreateInvoiceDto {
    @IsNotEmpty()
    products: Products[];
}