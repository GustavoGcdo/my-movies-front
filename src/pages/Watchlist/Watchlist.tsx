import React, { useState, useEffect } from 'react';
import { FunctionComponent } from 'react';
import { Movie } from '../../models/movie/movie';
import MovieItem from '../../components/Movie/MovieItem';
import Auth from '../../infra/auth/Auth';
import { MovieService } from '../../services/movie.service';
import { ProfileService } from '../../services/profile.service';
import { MyMovie } from '../../models/movie/myMovie';

const Watchlist: FunctionComponent = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getWatchlist();
  }, []);

  const getWatchlist = () => {
    const profileActive = Auth.getProfileActive();
    if (profileActive) {
      ProfileService.getWatchlist(profileActive._id).then((result) => {
        setMovieList(result.data);
      });
    }
  };

  return (
    <div>
      <section className='section'>
        <span className='title'>Meus filmes</span>

        <div className='movies'>
          {movieList.map((movie: MyMovie) => (
            <MovieItem key={movie._id} movie={movie.info} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Watchlist;
