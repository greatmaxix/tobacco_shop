import { Controller, Get, Logger, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    private logger = new Logger('ImagesController');

    constructor(private imagesService: ImagesService) {};
}
