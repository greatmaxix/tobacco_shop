import { Staff } from "src/staff/staff.entity";
import { Warehouses } from "src/warehouses/warehouses.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shops extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(type => Warehouses, warehouses => warehouses.shops, { eager: false })
    warehouses: Warehouses;

    @ManyToOne(type => Staff, staff => staff.shops, { eager: true })
    @JoinTable()
    staff: Staff;
}