import React, { FunctionComponent } from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { homeRoute, loginRoute, mainRoute } from './constants/routes.constants';
import Home from './pages/Home/Home';


const Routes: FunctionComponent = () => {
  return (
    <HashRouter>
      <Redirect from={mainRoute} exact to={loginRoute} />
      <Route path={homeRoute} exact component={Home} />
    </HashRouter>
  );
};

export default Routes;
