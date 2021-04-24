import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
    @IsNotEmpty()
    product_ids: number[];
}