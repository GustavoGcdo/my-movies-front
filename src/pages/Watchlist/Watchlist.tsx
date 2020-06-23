import React, { FunctionComponent, useEffect, useState } from 'react';
import MovieItem from '../../components/Movie/MovieItem';
import Auth from '../../infra/auth/Auth';
import { MyMovie } from '../../models/movie/myMovie';
import { ProfileService } from '../../services/profile.service';

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
