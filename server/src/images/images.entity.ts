import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(type => Images, imageables => imageables.imageables)
    @JoinColumn({ name: "imageable_id" })
    imageables: Images;
}