import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from 'src/roles/roles.controller';
import { RolesRepository } from 'src/roles/roles.repository';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository]),
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}