import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetProductTypesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    ids: number[];

    @IsOptional()
    @IsNotEmpty()
    type: string;
}