import { IsNotEmpty } from 'class-validator';
import { Warehouses } from 'src/warehouses/warehouses.entity';

export class CreateShopDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    warehouse: Warehouses;
}