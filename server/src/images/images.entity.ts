import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageable_type: string;

    @Column()
    imageable_id: number;

    @Column()
    alt_text: string;

    @Column({ type: "bytea", nullable: false })
    image_blob: Buffer;
}