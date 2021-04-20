import { Staff } from "src/staff/staff.entity";
import { Warehouse } from "src/warehouses/warehouses.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shops extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(type => Warehouse, warehouses => warehouses.shop, { eager: false })
    warehouses: Warehouse;

    @ManyToOne(type => Staff, staff => staff.shops, { eager: false })
    staff: Staff;
}