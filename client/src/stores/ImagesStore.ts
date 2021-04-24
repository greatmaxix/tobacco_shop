import { observable, action } from 'mobx';
import AuthService from '../services/authService';
import ImagesService from '../services/imagesService';

export default class ImagesStore {
  @observable images: any[] = [];
  protected imageService: ImagesService;

  constructor(imageService: ImagesService) {
    this.imageService = imageService;
  }

  @action
  async fetchImages(data: any) {
    const result: any = await this.imageService.fetchImages(data);
    this.images = result.data && result.data.length > 0 ? result.data : [];
  }

  @action
  async deleteImages(id: number) {
    return this.imageService.deleteImages(id);
  }

  @action
  async uploadImage(data: any) {
    return this.imageService.uploadImage(data);
  }
}
