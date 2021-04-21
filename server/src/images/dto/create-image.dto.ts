import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageDto {
    @IsNotEmpty()
    imageable_type: string;

    @IsNotEmpty()
    imageable_id: number;

    @IsNotEmpty()
    @IsOptional()
    alt_text: string;

    @IsNotEmpty()
    image_blob: string;
}