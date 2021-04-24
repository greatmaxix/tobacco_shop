import { Invoices } from "src/invoices/invoices.entity";
import { Roles } from "src/roles/roles.entity";
import { Shops } from "src/shops/shops.entity";
import { StaffMobiles } from "src/staff-mobiles/staff-mobiles.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class Staff extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    staff_first_name: string;

    @Column()
    staff_last_name: string;

    @Column()
    started_work_at: string;

    @Column()
    stopped_work_at: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @ManyToMany(type => Roles, roles => roles.staff, { eager: false })
    roles: Roles;

    @ManyToMany(type => Shops, shops => shops.staff, { eager: false })
    shops: Shops;

    @OneToMany(type => StaffMobiles, staffMobiles => staffMobiles.staff, { eager: false })
    staffMobiles: StaffMobiles;

    @OneToMany(type => Invoices, invoices => invoices.staff, { eager: false })
    invoices: Invoices;

    async validatePassword(password: string) : Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}