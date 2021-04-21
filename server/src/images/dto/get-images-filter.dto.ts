import { IsNotEmpty } from 'class-validator';

export class GetImagesFilterDto {
    @IsNotEmpty()
    imageable_type: string;

    @IsNotEmpty()
    imageable_id: number;
}