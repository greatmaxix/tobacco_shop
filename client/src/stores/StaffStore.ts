import { observable, action } from 'mobx';
import AuthService from '../services/authService';

export default class StaffStore {
  @observable username = null;
  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @action
  async signin(username: string, password: string) {
    this.username = await this.authService.signin(username, password);
  }

  @action
  async signup({username, first_name, last_name, password}: any) {
    return this.authService.signup({username, first_name, last_name, password});
  }

  @action
  signout() {
    this.username = null;
    this.authService.removeToken();
  }
}
