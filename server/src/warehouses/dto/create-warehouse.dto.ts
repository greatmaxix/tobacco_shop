import { IsNotEmpty } from 'class-validator';
import { Shops } from 'src/shops/shops.entity';

export class CreateWarehouseDto {
    shops: Shops[];

    @IsNotEmpty()
    address: string;
}