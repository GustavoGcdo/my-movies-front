import HttpService from './base/httpService';
import { LoginDto } from '../models/auth/login.dto';
import { SocialLoginDto } from '../models/auth/socialLogin.dto';
export class AuthService {
  static async login(loginDto: LoginDto) {
    const response = await HttpService.post(`/auth/login`, loginDto)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }

  static async loginWithFacebook(socialLoginDto: SocialLoginDto) {
    const response = await HttpService.post(`/auth/social`, socialLoginDto)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }
}
