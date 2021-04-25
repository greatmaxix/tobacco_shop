import BaseHttpService from './baseHttpService';
import queryString from 'query-string';



type ProductDto = {
  title: null | string,
  description: null | string,
  cost: null | number,
  productBrandId: null | any,
  productTypeId: null | any,
}

export default class ProductsService extends BaseHttpService {
  static url = 'products';
  static productTypeUrl = 'product-types';
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

  updateProduct(id: number, data: ProductDto) {
    return this.patch(ProductsService.url + `/${id}`, data);
  }
  getProduct(id: number) {
    return this.get(ProductsService.url + `/${id}`);
  }

  getProductType(id: number) {
    return this.get(ProductsService.productTypeUrl + `/${id}`);
  }

  createProduct(data: ProductDto) {
    return this.post(ProductsService.url, data);
  }
}
