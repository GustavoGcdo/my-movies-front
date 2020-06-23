import React, { FunctionComponent, useEffect, useState } from 'react';
import MovieItem from '../../components/Movie/MovieItem';
import './Home.scss';
import { MovieService } from '../../services/movie.service';
import Auth from '../../infra/auth/Auth';
import { Movie } from '../../models/movie/movie';

const Home: FunctionComponent = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    getRecommendedMovies();
  }, []);

  const getRecommendedMovies = () => {
    const profileActive = Auth.getProfileActive();
    if (profileActive) {
      MovieService.getRecommendedMovies(profileActive._id).then((result) => {
        setMovieList(result.data);
      });
    }
  };

  const searchMovie = (event: any) => {
    const searchTerm: string = event.target.value;

    if (searchTerm && searchTerm.trim().length > 0) {
      setSearchTerm(searchTerm);

      MovieService.searchMovies(searchTerm)
        .then((result) => {
          setMovieList(result.data.results);
        })
        .catch((err) => {
          setMovieList([]);
        });
    } else {
      setSearchTerm(undefined);
      getRecommendedMovies();
    }
  };

  return (
    <div>
      <section className='section'>
        <span className='title'>Buscar Filmes</span>
        <input
          className='input-search-movie'
          type='text'
          placeholder='Buscar filmes'
          onChange={searchMovie}
        />
      </section>

      <section className='section'>
        <span className='title'>
          {!searchTerm ? 'Recomendados para você' : 'Resultados da pesquisa'}
        </span>
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
