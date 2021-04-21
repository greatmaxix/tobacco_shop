import { EntityRepository, Repository } from "typeorm";
import { Shops } from "src/shops/shops.entity";

@EntityRepository(Shops)
export class ShopsRepository extends Repository<Shops> {
}