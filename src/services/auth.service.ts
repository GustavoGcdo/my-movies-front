import HttpService from './base/httpService';
import { LoginDto } from '../models/auth/login.dto';
export class AuthService {
  static async login(loginDto: LoginDto) {
    const response = await HttpService.post(`/auth/login`, loginDto)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }
}
