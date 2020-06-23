import React, { FunctionComponent } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import { homeRoute, loginRoute, mainRoute, signupRoute } from './constants/routes.constants';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from={mainRoute} exact to={loginRoute} />
        <Route path={homeRoute} exact component={Home} />
        <Route path={loginRoute} exact component={Login} />
        <Route path={signupRoute} exact component={Signup} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
