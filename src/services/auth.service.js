// import { post, get } from 'axios';
import BaseHttpService from './base-http.service';
export default class AuthService extends BaseHttpService {
  async signin(email, password) {
    const result = await this.post(`auth/signin`, { email, password });
    if (result) {
      const accessToken = result.data.accessToken;
      this.saveToken(accessToken);
      return result;
    }
  }

  async signup(newUser) {
    const res = await this.post(`auth/signup`, { ...newUser });
    if (res.status === 201) {
      return await this.signin(newUser.email, newUser.password)
    } else {
      console.log(res)
    }
  }
  async signInToken() {
    const res = await this.get(`auth/signInToken`);
    if (res && res.status === 200) {
      return res.data;
    } else {
      console.log(res)
    }
  }

  async signout() {
    this.removeToken();
  }
}
