import { Controller, Get, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { GetImagesFilterDto } from './dto/get-images-filter.dto';
import { Images } from './images.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    private logger = new Logger('ImagesController');

    constructor(private imagesService: ImagesService) {};

    @Get()
    getImages(
        filterDto: GetImagesFilterDto,
    ) : Promise<Images[]> {
        return this.imagesService.getImages(filterDto);
    }

    @Post()
    createImage(
        createImageDto: CreateImageDto,
    ) : Promise<Images> {
        return this.imagesService.createImage(createImageDto);
    }
}