import { Products } from "src/products/products.entity";
import { Staff } from "src/staff/staff.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoices extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Staff, staff => staff.invoices, { eager: false })
    staff: Staff;

    @Column()
    total_cost: number;

    @OneToMany(type => Products, products => products.invoices, { eager: false })
    products: Products[];

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
}