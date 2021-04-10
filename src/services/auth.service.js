import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(email, password) {
    const result = await post(`${this.BASE_URL}/auth/signin`, { email, password });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result;
  }

  async signup(newUser) {
    const res = await post(`${this.BASE_URL}/auth/signup`, { ...newUser });
    if (res.status === 201) {
      return await this.signin(newUser.email, newUser.password)
    } else {
      console.log(res)
    }
  }


  async signout() {
    this.removeToken();
  }
}
