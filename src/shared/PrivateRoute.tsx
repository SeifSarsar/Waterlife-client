import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Routes } from '../enums/Routes';

const PrivateRoute = ({ component, ...rest }: any) => {
  const context = useAuth();

  const routeComponent = (props: any) =>
    context.user ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={Routes.SignIn} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
