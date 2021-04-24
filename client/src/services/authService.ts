import post from 'axios';
import BaseHttpService from './baseHttpService';

export default class AuthService extends BaseHttpService {
  async signin(username: string, password: string) {
    const result = await post(`${this.BASE_URL}/auth/signin`, { data: { username, password } });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result.data.username;
  }

  async signup(username: string, password: string) {
    await post(`${this.BASE_URL}/auth/signup`, { data: { username, password } });
  }

  async signout() {
    this.removeToken();
  }
}
