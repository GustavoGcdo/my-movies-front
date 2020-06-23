import React, { FunctionComponent } from 'react';
import './MovieItem.scss';
import { Movie } from '../../models/movie/movie';

type Props = { movie: Movie };
const MovieItem: FunctionComponent<Props> = ({ movie }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getSourceImage = () => {
    if (movie.backdrop_path) {
      return 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path;
    }

    return 'https://dummyimage.com/300x169/e0e0e0/5e5e5e&text=sem+imagem';
  };

  return (
    <div className='movie'>
      <img src={getSourceImage()} alt='filme' />
      <div className='info'>
        <div>
          <span className='label'>Titulo: </span>
          <span className='value'>{movie.title}</span>
        </div>
        <div>
          <span className='label'>Lançamento: </span>
          <span className='value'>{formatDate(movie.release_date)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
