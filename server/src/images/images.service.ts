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

    async createImage(imageBuffer: any, createImageDto: CreateImageDto) : Promise<Images> {
        let image = new Images();
        image.imageable_id = createImageDto.imageable_id;
        image.imageable_type = createImageDto.imageable_type;
        image.alt_text = createImageDto.alt_text;
        image.image_blob = imageBuffer.buffer;
        image.mimetype = imageBuffer.mimetype;
        image.originalname = imageBuffer.originalname;
        image.encoding = imageBuffer.encoding;
        await image.save();
        return image;
    }
}
