import React, { FunctionComponent, useEffect, useState } from 'react';
import MovieItem from '../../components/Movie/MovieItem';
import Auth from '../../infra/auth/Auth';
import { MyMovie } from '../../models/movie/myMovie';
import { ProfileService } from '../../services/profile.service';
import MovieContainer from '../../components/MovieContainer/MovieContainer';
import { Result } from '../../infra/result';
import Snackbar from '@material-ui/core/Snackbar';

const Watchlist: FunctionComponent = () => {
  const [movieList, setMovieList] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState('');

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

  const handleMarkAsWatched = (movieId: string) => {
    const profileActive = Auth.getProfileActive();
    if (profileActive) {
      ProfileService.markAsWatched(profileActive._id, movieId)
        .then((result) => {
          getWatchlist();
          setMessageSnackBar('Filme marcado como assistido');
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
        <span className='title'>Meus filmes</span>

        <div className='movies'>
          {movieList.length > 0 ? (
            movieList.map((movie: MyMovie) => (
              <MovieContainer
                key={movie._id}
                value={movie._id}
                onClickAction={handleMarkAsWatched}
                textAction={'Marcar como assistido'}
              >
                <div>
                  {movie.watched && <span className='as-watched'>Assistido</span>}
                  <MovieItem movie={movie.info} />
                </div>
              </MovieContainer>
            ))
          ) : (
            <span>Nenhum filme adicionado a lista</span>
          )}
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

export default Watchlist;
