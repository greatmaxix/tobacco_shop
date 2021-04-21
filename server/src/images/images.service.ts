import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { GetImagesFilterDto } from './dto/get-images-filter.dto';
import { Images } from './images.entity';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImagesRepository)
        private imagesRepository: ImagesRepository
    ) {}

    async getImages(filterDto: GetImagesFilterDto) : Promise<Images[]> {
        return this.imagesRepository.getImages(filterDto);
    }

    async createImage(createImageDto: CreateImageDto) : Promise<Images> {
        let image = new Images();
        image.imageable_id = createImageDto.imageable_id;
        image.imageable_type = createImageDto.imageable_type;
        // image.image_blob = Buffer.from(createImageDto.image_blob.split("base64,")[1], "base64");
        await image.save();
        return image;
    }
}
