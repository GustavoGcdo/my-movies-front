import Auth from '../infra/auth/Auth';
import HttpService from './base/httpService';

export class MovieService {
  static async getRecommendedMovies(profileId: string) {
    const response = await HttpService.get(`/movies/recommended/${profileId}`, {
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


  static async searchMovies(search: string) {
    const response = await HttpService.get(`/movies?search=${search}`, {
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
