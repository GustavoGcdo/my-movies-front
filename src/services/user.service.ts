import { SignUpDto } from '../models/user/user.dto';
import HttpService from './base/httpService';
import Auth from '../infra/auth/Auth';

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
}
