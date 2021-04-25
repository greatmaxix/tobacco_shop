import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
        @Query() filterDto: GetImagesFilterDto,
    ) : Promise<Images[]> {
        return this.imagesService.getImages(filterDto);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image_blob'))
    createImage(
        @UploadedFile() image,
        @Body() createImageDto: CreateImageDto,
    ) : Promise<Images> {
        return this.imagesService.createImage(image, createImageDto);
    }
}