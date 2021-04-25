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
    image_blob: any;

    @Column()
    mimetype: string;

    @Column()
    originalname: string;

    @Column()
    encoding: string;

    @ManyToOne(type => Images, imageables => imageables.imageables, {
        createForeignKeyConstraints: false})
    @JoinColumn({ name: "imageable_id" })
    imageables: Images;
}