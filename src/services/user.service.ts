import { SignUpDto } from '../models/user/user.dto';
import HttpService from './base/httpService';
import Auth from '../infra/auth/Auth';
import { Profile } from '../models/profile/profile';

export class UserService {
  static async sinup(signupDto: SignUpDto) {
    const response = await HttpService.post(`/users/signup`, signupDto)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }

  static async getProfiles(userId: string) {
    const response = await HttpService.get(`/users/${userId}/profiles`, {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
      },
    })

      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }

  static async addProfile(userId: string, profile: Profile) {
    const response = await HttpService.post(`/users/${userId}/profiles`, profile, {
      headers: {
        Authorization: 'Bearer ' + Auth.getToken(),
      },
    })

      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }
}
