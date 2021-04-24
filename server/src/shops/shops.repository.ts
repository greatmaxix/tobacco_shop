import { EntityRepository, Repository } from "typeorm";
import { Shops } from "src/shops/shops.entity";
import { Products } from "src/products/products.entity";
import { Staff } from "src/staff/staff.entity";
import { CreateShopDto } from "src/shops/dto/create-shop.dto";
import { GetShopsFilterDto } from "src/shops/dto/get-shops-filter.dto";

@EntityRepository(Shops)
export class ShopsRepository extends Repository<Shops> {
    async getShops(filterDto: GetShopsFilterDto) : Promise<Shops[]> {
        const { ids, name } = filterDto;
        const query = this.createQueryBuilder('shops');

        if (ids) {
            query.andWhereInIds(ids);
        }

        if (name) {
            query.andWhere('shops.name = :name', { name });
        }
        
        const shops = await query.getMany();
        return shops;
    }

    async createShop(createShopDto: CreateShopDto, staff: Staff) : Promise<Shops> {
        const { name, address, warehouse } = createShopDto;
        const shop = new Shops();
        shop.name = name;
        shop.address = address;
        shop.warehouses = warehouse;
        shop.staff = staff;
        await shop.save();

        return shop;
    }

    async updateShop(id: number, createShopDto: CreateShopDto, staff: Staff) : Promise<Shops> {
        const { name, address, warehouse } = createShopDto;
        const shop = new Shops();
        shop.name = name;
        shop.address = address;
        shop.warehouses = warehouse;
        shop.staff = staff;
        await shop.save();
        return shop;
    }
}