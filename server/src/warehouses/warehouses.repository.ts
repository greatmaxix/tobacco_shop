import { EntityRepository, Repository } from "typeorm";
import { Warehouses } from "src/warehouses/warehouses.entity";
import { Staff } from "src/staff/staff.entity";
import { CreateWarehouseDto } from "src/warehouses/dto/create-warehouse.dto";
import { GetWarehousesFilterDto } from "src/warehouses/dto/get-warehouses-filter.dto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Warehouses)
export class WarehousesRepository extends Repository<Warehouses> {
    async getWarehouses(filterDto: GetWarehousesFilterDto) : Promise<Warehouses[]> {
        const { ids, address } = filterDto;
        const query = this.createQueryBuilder('warehouses');

        if (ids) {
            query.andWhereInIds(ids);
        }

        if (address) {
            query.andWhere('warehouses.address = :address', { address });
        }
        
        const warehouses = await query.getMany();
        return warehouses;
    }

    async createWarehouse(createWarehouseDto: CreateWarehouseDto, staff: Staff) : Promise<Warehouses> {
        const { shops, address } = createWarehouseDto;
        const warehouse = new Warehouses();
        warehouse.shops = shops;
        warehouse.address = address;
        await warehouse.save();

        return warehouse;
    }

    async updateWarehouse(id: number, createWarehouseDto: CreateWarehouseDto, staff: Staff) : Promise<Warehouses> {
        const { shops, address } = createWarehouseDto;
        const warehouse = await this.findOne(id);
        if (!warehouse) {
            throw new NotFoundException(`Warehouse with id "${id}" not found`);
        }
        warehouse.shops = shops;
        warehouse.address = address;
        await warehouse.save();
        return warehouse;
    }
}