import { EntityRepository, Repository } from "typeorm";
import { GetImagesFilterDto } from "./dto/get-images-filter.dto";
import { Images } from "./images.entity";

@EntityRepository(Images)
export class ImagesRepository extends Repository<Images> {
    async getImages(filterDto: GetImagesFilterDto) : Promise<Images[]> {
        const { imageable_id, imageable_type } = filterDto;
        const query = this.createQueryBuilder('images');
        
        query.andWhere('images.imageable_id = :imageable_id', { imageable_id });
        query.andWhere('images.imageable_type = :imageable_type', { imageable_type });

        const products = await query.getMany();
        return products;
    }
}