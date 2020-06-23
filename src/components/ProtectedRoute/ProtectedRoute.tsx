import React, { FunctionComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Auth from '../../infra/auth/Auth';
import { loginRoute } from '../../constants/routes.constants';

const ProtectedRoute: FunctionComponent<RouteProps> = ({ component, render, ...rest }) => {
  return (
    <Route
      render={(props) => {
        if (!Auth.isLogged()) {
          return <Redirect to={loginRoute} />;
        }

        if (component) {
          return React.createElement(component);
        }

        if (render) {
          return render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
