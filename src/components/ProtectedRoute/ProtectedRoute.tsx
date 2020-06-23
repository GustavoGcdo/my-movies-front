import React, { FunctionComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Auth from '../../infra/auth/Auth';
import { loginRoute } from '../../constants/routes.constants';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const ProtectedRoute: FunctionComponent<RouteProps> = ({ component, render, ...rest }) => {
  return (
    <Route
      render={(props) => {
        if (!Auth.isLogged()) {
          return <Redirect to={loginRoute} />;
        }

        if (component) {
          return <MainLayout>{React.createElement(component)}</MainLayout>;
        }

        if (render) {
          return render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
