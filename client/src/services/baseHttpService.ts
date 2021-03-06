import axios from 'axios';
import { RouterStore } from 'mobx-react-router';

export default class BaseHttpService {
  protected BASE_URL = 'http://localhost:8080';

  protected routerStore: RouterStore;
  protected _accessToken: string | null;

  constructor(routerStore: RouterStore) {
    this.routerStore = routerStore;
    this._accessToken = null;
  }

  async get(endpoint: string, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async post(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));  
  }

  async delete(endpoint: string, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));     
  }

  async patch(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));   
  }

  _handleHttpError(error: any) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401();
    }
  }

  _handle401() {
    this.routerStore.push('/signin');
  }

  _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  saveToken(accessToken: string) {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }
}
