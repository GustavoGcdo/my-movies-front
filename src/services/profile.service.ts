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

  static async addToWatchlist(profileId: string, movieId: number) {
    const addMovieDto = { movieId };
    const response = await HttpService.post(`/profiles/${profileId}/watchlist`, addMovieDto, {
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

  static async markAsWatched(profileId: string, movieId: string) {
    const response = await HttpService.post(
      `/profiles/${profileId}/watchlist/${movieId}/watched`,
      null,
      {
        headers: {
          Authorization: 'Bearer ' + Auth.getToken(),
        },
      },
    )
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  }
}
