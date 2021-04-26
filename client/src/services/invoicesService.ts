import BaseHttpService from './baseHttpService';
import queryString from 'query-string';

export default class InvoicesService extends BaseHttpService {
  static url = 'invoices';

  fetchInvoices({ title, invoice_types_id, invoice_brands_id }: any) {
    const queryObj: any = {};

    if (title) {
      queryObj.title = title;
    }

    if (invoice_types_id && invoice_types_id.length) {
      queryObj.invoice_types_id = invoice_types_id;
    }

    if (invoice_brands_id && invoice_brands_id.length) {
      queryObj.invoice_brands_id = invoice_brands_id;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get(InvoicesService.url + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteInvoices(id: number){
    await this.delete(InvoicesService.url + `/${id}`);
  }

  async updateInvoice(id: number, data: any) {
    return await this.patch(InvoicesService.url + `/${id}`, data);
  }
  async getInvoice(id: number) {
    return await this.get(InvoicesService.url + `/${id}`);
  }

  async createInvoice(data: any) : Promise<any> {
    return await this.post(InvoicesService.url, data);
  }
}
