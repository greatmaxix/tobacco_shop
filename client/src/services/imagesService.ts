import BaseHttpService from './baseHttpService';
import queryString from 'query-string';

type ImageFormData = {
  imageable_type: null | string,
  imageable_id: null | number,
  alt_text: null | string,
  image_blob: null | any,
  mimetype?: any,
  originalname?: any,
  encoding?: any,
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

  async uploadImage(data: any) {
    return await this.post(ImagesService.url, data);
  }
}
