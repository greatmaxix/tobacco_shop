import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetProductBrandsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    ids: number[];

    @IsOptional()
    @IsNotEmpty()
    brand_name: string;

    @IsOptional()
    @IsNotEmpty()
    brand_description: string;
}