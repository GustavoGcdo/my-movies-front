import React, { FunctionComponent } from 'react';
import './Movie.scss';

const Movie: FunctionComponent = () => {
  return (
    <div className='movie'>
      <img src='https://image.tmdb.org/t/p/w300/zuW6fOiusv4X9nnW3paHGfXcSll.jpg' alt='filme' />
      <div className='info'>
        <div>
          <span className='label'>Titulo: </span>
          <span className='value'>Avengers: Guerra Infinita</span>
        </div>
        <div>
          <span className='label'>Lançamento: </span>
          <span className='value'>10/05/2012 </span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
