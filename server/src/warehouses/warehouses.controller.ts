import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetStaff } from 'src/staff/get-user.decorator';
import { Staff } from 'src/staff/staff.entity';
import { CreateWarehouseDto } from 'src/warehouses/dto/create-warehouse.dto';
import { GetWarehousesFilterDto } from 'src/warehouses/dto/get-warehouses-filter.dto';
import { Warehouses } from 'src/warehouses/warehouses.entity';
import { WarehousesService } from 'src/warehouses/warehouses.service';

@Controller('warehouses')
export class WarehousesController {
    constructor(private warehousesService: WarehousesService) {};

    @Get()
    getWarehouses(
        filterDto: GetWarehousesFilterDto,
    ) : Promise<Warehouses[]> {
        return this.warehousesService.getWarehouses(filterDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    createWarehouse(
        @Body() createWarehouseDto: CreateWarehouseDto,
        @GetStaff() staff: Staff,
    ) : Promise<Warehouses> {
        return this.warehousesService.createWarehouse(createWarehouseDto, staff);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteWarehouse(
        @Param('id', ParseIntPipe) id: number,
        @GetStaff() staff: Staff,
    ) : Promise<void> {
        return this.warehousesService.deleteWarehouse(id, staff);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createWarehouseDto: CreateWarehouseDto,
        @GetStaff() staff: Staff,
    ) : Promise<Warehouses> {
        return this.warehousesService.updateWarehouse(id, createWarehouseDto, staff);
    }
}
