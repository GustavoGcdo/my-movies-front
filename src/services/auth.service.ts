import HttpService from './base/httpService';
import { LoginDto } from '../models/auth/login.dto';
export class AuthService {
  private _authenticated: boolean;

  constructor() {
    this._authenticated = false;
  }

  async login(loginDto: LoginDto) {
    const response = await HttpService.post(`/auth/login`, loginDto)
      .then((response) => {
        this._authenticated = true;        
        const { data } = response.data;
        const { token } = data;
        localStorage.setItem('token', token);
        return response.data;
      })
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }

  isLogged() {
    const token = localStorage.getItem('token');
    return token != null;
  }

  loggout() {
    localStorage.removeItem('token');
    this._authenticated = false;
  }
}
