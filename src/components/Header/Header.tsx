import React, { FunctionComponent } from 'react';
import './Header.scss';
import Auth from '../../infra/auth/Auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { loginRoute } from '../../constants/routes.constants';

const Header: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const payloadUser = Auth.getPayload();

  const logout = () => {
    Auth.loggout();
    history.push(loginRoute);
  };

  return (
    <header className='header-main'>
      <div className='user'>
        <span className='name'>{payloadUser?.email}</span>
        <div className='img-user'></div>
        <div onClick={logout} className='logout'>
          Sair
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
