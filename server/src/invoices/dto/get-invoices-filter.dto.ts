import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetInvoicesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    ids: number[];

    @IsOptional()
    @IsNotEmpty()
    created_at: string;

    @IsOptional()
    @IsNotEmpty()
    updated_at: string;

    @IsOptional()
    @IsNotEmpty()
    total_cost: string;
}