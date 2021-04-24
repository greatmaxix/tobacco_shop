import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetShopsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    ids: number[];

    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    address: string;
}