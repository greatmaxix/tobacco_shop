import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Audit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column({ type: 'timestamp', nullable: true })
    actionDate: Date;

    @Column({ nullable: true })
    payload: string;
}