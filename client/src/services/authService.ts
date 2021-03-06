import axios from 'axios';
import BaseHttpService from './baseHttpService';

export default class AuthService extends BaseHttpService {
  async signin(username: string, password: string) {
    const result = await axios.post(`${this.BASE_URL}/staff/signin`, { username, password });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result.data.username;
  }

  async signup({username, first_name, last_name, password}: any) {
    await axios.post(`${this.BASE_URL}/staff/signup`, { username, first_name, last_name, password });
  }

  async signout() {
    this.removeToken();
  }
}
