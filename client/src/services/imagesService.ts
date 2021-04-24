import BaseHttpService from './baseHttpService';
import queryString from 'query-string';

type ProductDto = {
  title: null | string,
  description: null | string,
  cost: null | number,
  productBrandId: null | any,
  productTypeId: null | any,
}

export default class ImagesService extends BaseHttpService {
  static url = 'images';
  fetchImages({ imageable_type, imageable_id }: any) {
    const queryObj: any = {};

    if (imageable_type) {
      queryObj.imageable_type = imageable_type;
    }

    if (imageable_id) {
      queryObj.imageable_id = imageable_id;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(ImagesService.url + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteImages(id: number) {
    await this.delete(ImagesService.url + `/${id}`);
  }

  uploadImage(data: ProductDto) {
    return this.post(ImagesService.url, data);
  }
}
