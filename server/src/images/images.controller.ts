import { Controller, Get, Logger, Param, ParseIntPipe, Query } from '@nestjs/common';
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
}
