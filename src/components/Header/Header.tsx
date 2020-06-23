import React, { FunctionComponent } from 'react';
import './Header.scss';

const Header: FunctionComponent = () => {
  return (
    <header className='header-main'>
      <div className='user'>
        <span className='name'>Olá, Administrador</span>
        <div className='img-user'></div>
      </div>
    </header>
  );
};

export default Header;
