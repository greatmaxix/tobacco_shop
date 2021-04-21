import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from 'src/images/images.controller';
import { ImagesRepository } from 'src/images/images.repository';
import { ImagesService } from 'src/images/images.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImagesRepository]),
    ],
    controllers: [ImagesController],
    providers: [ImagesService]
})
export class ImagesModule {}