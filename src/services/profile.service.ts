import Auth from '../infra/auth/Auth';
import HttpService from './base/httpService';

export class ProfileService {
  
  static async getWatchlist(profileId: string) {
    const response = await HttpService.get(`/profiles/${profileId}/watchlist`, {
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
