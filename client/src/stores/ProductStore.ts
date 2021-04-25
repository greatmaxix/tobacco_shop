import { observable, action } from 'mobx';
import AuthService from '../services/authService';
import ProductsService from '../services/productsService';

export default class ProductStore {
  @observable products: any[] = [];
  protected productService: ProductsService;

  constructor(productService: ProductsService) {
    this.productService = productService;
  }

  @action
  async fetchProducts(data: any) {
    const result: any = await this.productService.fetchProducts(data);
    this.products = result.data && result.data.length > 0 ? result.data : [];
    return this.products;
  }

  @action
  async deleteProducts(id: number) {
    return this.productService.deleteProducts(id);
  }

  @action
  async updateProduct(id: number, data: any) {
    return this.productService.updateProduct(id, data);
  }

  @action
  async createProduct(data: any) {
    return this.productService.createProduct(data);
  }
}
