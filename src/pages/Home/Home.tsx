import React, { FunctionComponent } from 'react';
import Movie from '../../components/Movie/Movie';
import './Home.scss';

const Home: FunctionComponent = () => {
  return (
    <div>      
      <section className='section'>
        <span className='title'>Buscar Filmes</span>
        <input className='input-search-movie' type='text' placeholder='Buscar filmes' />
      </section>

      <section className='section'>
        <span className='title'>Recomendados para você</span>
        <div className='movies'>
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
        </div>
      </section>
    </div>
  );
};

export default Home;
