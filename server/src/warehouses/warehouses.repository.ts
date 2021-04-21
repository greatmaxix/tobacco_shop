import { EntityRepository, Repository } from "typeorm";
import { Warehouses } from "src/warehouses/warehouses.entity";

@EntityRepository(Warehouses)
export class WarehousesRepository extends Repository<Warehouses> {
}