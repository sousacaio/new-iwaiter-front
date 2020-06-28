import React from "react";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Catalog from './pages/Catalog/Catalog';
import QrCodes from './pages/QrCodes/QrCodes';
import Points from './pages/Points/Points';
import Testes from './pages/Testes/Testes';
import Main from './pages/Orders/Orders';
import Account from './pages/Account/Account';
import Settings from './pages/Settings/Settings';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute path="/orders" component={Main} />
      <PrivateRoute path="/points" component={Points} />
      <PrivateRoute path="/catalog" component={Catalog} />
      <PrivateRoute path="/qr" component={QrCodes} />
      <PrivateRoute path="/testes" component={Testes} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/account" component={Account} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
