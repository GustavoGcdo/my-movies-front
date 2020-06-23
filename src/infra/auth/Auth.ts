import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/auth/login.dto';

class Auth {
  private _authenticated: boolean;

  constructor() {
    this._authenticated = false;
  }

  async login(loginDto: LoginDto) {
    const response: any = await AuthService.login(loginDto)
      .then((result) => {
        this._authenticated = true;
        const { token } = result.data;        
        localStorage.setItem('token', token);
        return result.data;
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

export default new Auth();
