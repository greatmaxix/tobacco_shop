import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
