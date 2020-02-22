import React from "react";
import App from './pages/Agora/Agora';
import Login from './pages/Login/Login';
import Cardapio from './pages/Cardapio/Cardapio';
import QrCodes from './pages/QrCodes/QrCodes';
import AddMesas from './pages/AddMesas/AddMesas';
import AddCardapio from './pages/AddCardapio/AddCardapio';
import Testes from './pages/Testes/Testes';
import Main from './pages/Main/Main';
import Configuracoes from './pages/Configuracoes/Configuracoes';

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
      <PrivateRoute path="/mesas" component={App} />
      <PrivateRoute path="/main" component={Main} />
      <PrivateRoute path="/addmesas" component={AddMesas} />
      <PrivateRoute path="/cardapio" component={Cardapio} />
      <PrivateRoute path="/addcardapio" component={AddCardapio} />
      <PrivateRoute path="/qr" component={QrCodes} />
      <PrivateRoute path="/testes" component={Testes} />
      <PrivateRoute path="/configuracoes" component={Configuracoes} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
