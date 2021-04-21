import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehousesController } from 'src/warehouses/warehouses.controller';
import { WarehousesRepository } from 'src/warehouses/warehouses.repository';
import { WarehousesService } from 'src/warehouses/warehouses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehousesRepository]),
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService]
})
export class WarehousesModule {}
