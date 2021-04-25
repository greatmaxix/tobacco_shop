import { Staff } from "src/staff/staff.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['role_title'])
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_title: string;

    @Column()
    role_description: string;

    @ManyToMany(type => Staff, staff => staff.roles, { eager: true })
    @JoinTable()
    staff: Staff;
}