import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateShopDto } from 'src/shops/dto/create-shop.dto';
import { GetStaff } from 'src/staff/get-user.decorator';
import { Staff } from 'src/staff/staff.entity';
import { GetShopsFilterDto } from 'src/shops/dto/get-shops-filter.dto';
import { Shops } from 'src/shops/shops.entity';
import { ShopsService } from 'src/shops/shops.service';

@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService) {};

    @Get()
    getShops(
        filterDto: GetShopsFilterDto,
    ) : Promise<Shops[]> {
        return this.shopsService.getShops(filterDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    createShop(
        @Body() createShopDto: CreateShopDto,
        @GetStaff() staff: Staff,
    ) : Promise<Shops> {
        return this.shopsService.createShop(createShopDto, staff);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteShop(
        @Param('id', ParseIntPipe) id: number,
        @GetStaff() staff: Staff,
    ) : Promise<void> {
        return this.shopsService.deleteShop(id, staff);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createShopDto: CreateShopDto,
        @GetStaff() staff: Staff,
    ) : Promise<Shops> {
        return this.shopsService.updateShop(id, createShopDto, staff);
    }
}
