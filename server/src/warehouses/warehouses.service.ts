import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { CreateWarehouseDto } from 'src/warehouses/dto/create-warehouse.dto';
import { GetWarehousesFilterDto } from 'src/warehouses/dto/get-warehouses-filter.dto';
import { Warehouses } from 'src/warehouses/warehouses.entity';
import { WarehousesRepository } from 'src/warehouses/warehouses.repository';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(WarehousesRepository)
        private warehousesRepository: WarehousesRepository
    ) {}

    async getWarehouses(filterDto: GetWarehousesFilterDto) : Promise<Warehouses[]> {
        return this.warehousesRepository.getWarehouses(filterDto);
    }

    async getWarehouseById(id: number) : Promise<Warehouses> {
        let found = await this.warehousesRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Warehouse with id "${id}" not found`);
        }
        return found;
    }

    async createWarehouse(createWarehouseDto: CreateWarehouseDto, staff: Staff) : Promise<Warehouses> {
        return this.warehousesRepository.createWarehouse(createWarehouseDto, staff);
    }

    async deleteWarehouse(id: number, staff: Staff) : Promise<void> {
        const { raw, affected }  = await this.warehousesRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Warehouse with id "${id}" not found`);
        }
    }
    async updateWarehouse(id: number, createWarehouseDto: CreateWarehouseDto, staff: Staff) : Promise<Warehouses> {
        return this.warehousesRepository.updateWarehouse(id, createWarehouseDto, staff);
    }
}
