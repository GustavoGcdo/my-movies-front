import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/auth/login.dto';
import jwt from 'jsonwebtoken';
import { Payload } from '../../models/auth/payload';
import { Profile } from '../../models/profile/profile';

class Auth {
  private _authenticated: boolean;

  constructor() {
    this._authenticated = false;
  }

  async login(loginDto: LoginDto) {
    const response: any = await AuthService.login(loginDto).then((result) => {
      this._authenticated = true;
      const { token } = result.data;
      localStorage.setItem('token', token);
      this.setMainProfile();
      return result.data;
    });

    return response;
  }

  setMainProfile() {
    const payload = this.getPayload();
    if (payload) {
      const mainProfile = payload.profiles.find((p) => p.isMain);
      if (mainProfile) {
        this.setProfileActive(mainProfile);
      }
    }
  }

  isLogged() {
    const token = this.getToken();
    return token != null;
  }

  loggout() {
    localStorage.removeItem('token');
    this._authenticated = false;
  }

  getPayload() {
    const token = this.getToken();
    if (token) {
      const payload = jwt.decode(token) as Payload;
      return payload;
    }
  }

  getProfileActive() {
    const profileActive = localStorage.getItem('profileActive');
    if (profileActive) {
      return JSON.parse(profileActive) as Profile;
    }
  }

  setProfileActive(profile: Profile) {
    const stringifyProfile = JSON.stringify(profile);
    localStorage.setItem('profileActive', stringifyProfile);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new Auth();
