import { SignUpDto } from '../models/user/user.dto';
import HttpService from './base/httpService';
export class UserService {
  static async sinup(signupDto: SignUpDto) {
    const response = await HttpService.post(`/users/signup`, signupDto)
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }
}
