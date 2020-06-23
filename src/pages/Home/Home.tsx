import React, { FunctionComponent, useEffect, useState } from 'react';
import MovieItem from '../../components/Movie/MovieItem';
import './Home.scss';
import { MovieService } from '../../services/movie.service';
import Auth from '../../infra/auth/Auth';
import { Movie } from '../../models/movie/movie';

const Home: FunctionComponent = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const profileActive = Auth.getProfileActive();
    if (profileActive) {
      MovieService.getRecommendedMovies(profileActive._id).then((result) => {
        setMovieList(result.data);
      });
    }
  }, []);

  return (
    <div>
      <section className='section'>
        <span className='title'>Buscar Filmes</span>
        <input className='input-search-movie' type='text' placeholder='Buscar filmes' />
      </section>

      <section className='section'>
        <span className='title'>Recomendados para você</span>
        <div className='movies'>
          {movieList.map((movie: Movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
