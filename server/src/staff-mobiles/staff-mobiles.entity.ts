import { Staff } from "src/staff/staff.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['mobile'])
export class StaffMobiles extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mobile: string;

    @ManyToOne(type => Staff, staff => staff.staffMobiles, { eager: false })
    staff: Staff;
}