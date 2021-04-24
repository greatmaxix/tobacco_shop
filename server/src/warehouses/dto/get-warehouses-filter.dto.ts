import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetWarehousesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    ids: number[];

    @IsOptional()
    @IsNotEmpty()
    address: string;
}