import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetProductsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    product_types_id: number;

    @IsOptional()
    @IsNotEmpty()
    product_brands_id: number;

    @IsNotEmpty()
    limit: number;

    @IsNotEmpty()
    offset: number;
}