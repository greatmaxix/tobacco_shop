import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsController } from 'src/shops/shops.controller';
import { ShopsRepository } from 'src/shops/shops.repository';
import { ShopsService } from 'src/shops/shops.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopsRepository]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule {}
