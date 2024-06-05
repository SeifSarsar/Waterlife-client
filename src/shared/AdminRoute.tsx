import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AccountType } from '../enums/AccountType';
import { Routes } from '../enums/Routes';

const AdminRoute = ({ component, ...rest }: any) => {
  const context = useAuth();

  const routeComponent = (props: any) =>
    context.user && (context.user.accountType === AccountType.admin || context.user.accountType === AccountType.manager) ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={Routes.SignIn} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default AdminRoute;
