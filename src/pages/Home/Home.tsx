import Snackbar from '@material-ui/core/Snackbar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import MovieContainer from '../../components/MovieContainer/MovieContainer';
import MovieItem from '../../components/Movie/MovieItem';
import Auth from '../../infra/auth/Auth';
import { Result } from '../../infra/result';
import { Movie } from '../../models/movie/movie';
import { MovieService } from '../../services/movie.service';
import { ProfileService } from '../../services/profile.service';
import './Home.scss';

const Home: FunctionComponent = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState('');

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

  const handleToAddToWatchlist = (movieId: number) => {
    const profileActive = Auth.getProfileActive();
    if (profileActive) {
      ProfileService.addToWatchlist(profileActive._id, movieId)
        .then((result) => {
          console.log(result);
          setMessageSnackBar('Filme adicionado a sua lista!');
          setOpenSnackBar(true);
        })
        .catch((resultError) => {
          handleErrors(resultError);
        });
    }
  };

  const handleErrors = (resultError: Result) => {
    if (resultError.errors) {
      setMessageSnackBar('Este filme já está na sua lista');
    } else {
      setMessageSnackBar('Falha no servidor');
    }
    setOpenSnackBar(true);
  };

  const onCloseSnack = () => {
    setOpenSnackBar(false);
  };

  return (
    <div>
      <section className='section'>
        <span className='title'>Buscar Filmes</span>
        <input
          className='input-search-movie'
          type='search'
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
            <MovieContainer
              key={movie.id}
              value={movie.id}
              onClickAction={handleToAddToWatchlist}
              textAction={'Adicionar a lista'}
            >
              <MovieItem movie={movie} />
            </MovieContainer>
          ))}
        </div>
      </section>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        open={openSnackBar}
        onClose={onCloseSnack}
        message={messageSnackBar}
      />
    </div>
  );
};

export default Home;
