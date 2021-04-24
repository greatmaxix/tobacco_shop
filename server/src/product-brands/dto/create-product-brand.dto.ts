import { IsNotEmpty } from 'class-validator';

export class CreateProductBrandDto {
    @IsNotEmpty()
    brand_name: string;

    @IsNotEmpty()
    brand_description: string;
}