import BaseHttpService from './baseHttpService';
import queryString from 'query-string';
import { ProductType } from '../types/ProductType';

type ProductDto = {
  title: null | string,
  description: null | string,
  cost: null | number,
  productBrand: null | any,
  productType: null | any,
}

export default class ProductsService extends BaseHttpService {
  static url = 'products';
  static productTypeUrl = 'product-types';
  static productBrandUrl = 'product-brands';
  fetchProducts({ title, product_types_id, product_brands_id }: any) {
    const queryObj: any = {};

    if (title) {
      queryObj.title = title;
    }

    if (product_types_id && product_types_id.length) {
      queryObj.product_types_id = product_types_id;
    }

    if (product_brands_id && product_brands_id.length) {
      queryObj.product_brands_id = product_brands_id;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(ProductsService.url + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteProducts(id: number){
    await this.delete(ProductsService.url + `/${id}`);
  }

  async updateProduct(id: number, data: ProductDto) {
    return await this.patch(ProductsService.url + `/${id}`, data);
  }
  async getProduct(id: number) {
    return await this.get(ProductsService.url + `/${id}`);
  }

  async createProduct(data: ProductDto) : Promise<any> {
    return await this.post(ProductsService.url, data);
  }

  async fetchProductTypes({type}: any) {
    const queryObj: any = {};

    if (type) {
      queryObj.type = type;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(ProductsService.productTypeUrl + (queryStr ? `?${queryStr}` : ''));
  }

  async getProductType(id: number) {
    return await this.get(ProductsService.productTypeUrl + `/${id}`);
  }

  async fetchProductBrands({ids, brand_name, brand_description}: any) {
    const queryObj: any = {};

    if (ids) {
      queryObj.ids = ids;
    }

    if (brand_name) {
      queryObj.brand_name = brand_name;
    }

    if (brand_description) {
      queryObj.brand_description = brand_description;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(ProductsService.productBrandUrl + (queryStr ? `?${queryStr}` : ''));
  }
}
