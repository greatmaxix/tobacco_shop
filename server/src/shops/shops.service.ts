import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { CreateShopDto } from 'src/shops/dto/create-shop.dto';
import { GetShopsFilterDto } from 'src/shops/dto/get-shops-filter.dto';
import { Shops } from 'src/shops/shops.entity';
import { ShopsRepository } from 'src/shops/shops.repository';

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(ShopsRepository)
        private shopsRepository: ShopsRepository
    ) {}

    async getShops(filterDto: GetShopsFilterDto) : Promise<Shops[]> {
        return this.shopsRepository.getShops(filterDto);
    }

    async getShopById(id: number) : Promise<Shops> {
        let found = await this.shopsRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Shop with id "${id}" not found`);
        }
        return found;
    }

    async createShop(createShopDto: CreateShopDto, staff: Staff) : Promise<Shops> {
        return this.shopsRepository.createShop(createShopDto, staff);
    }

    async deleteShop(id: number, staff: Staff) : Promise<void> {
        const { raw, affected }  = await this.shopsRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Shop with id "${id}" not found`);
        }
    }
    async updateShop(id: number, createShopDto: CreateShopDto, staff: Staff) : Promise<Shops> {
        return this.shopsRepository.updateShop(id, createShopDto, staff);
    }
}
