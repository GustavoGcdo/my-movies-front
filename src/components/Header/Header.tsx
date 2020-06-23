import React, { FunctionComponent } from 'react';
import './Header.scss';
import Auth from '../../infra/auth/Auth';

const Header: FunctionComponent = () => {
  const payloadUser = Auth.getPayload();

  return (
    <header className='header-main'>
      <div className='user'>
        <span className='name'>{payloadUser?.email}</span>
        <div className='img-user'></div>
      </div>
    </header>
  );
};

export default Header;
