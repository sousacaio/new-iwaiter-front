import React from "react";
import App from './pages/Agora/Agora';
import Login from './pages/Login/Login';
import Cardapio from './pages/Cardapio/Cardapio';
import ItemCardapio from './pages/ItemCardapio/ItemCardapio';
import QrCodes from './pages/QrCodes/QrCodes';
import AddMesas from './pages/AddMesas/AddMesas';
import AddCardapio from './pages/AddCardapio/AddCardapio';
import Teste from './components/Testes/Testes';
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
      <PrivateRoute path="/addmesas" component={AddMesas} />
      <PrivateRoute path="/cardapio" component={Cardapio} />
      <PrivateRoute path="/addcardapio" component={AddCardapio} />
      <PrivateRoute path="/item" component={ItemCardapio} />
      <PrivateRoute path="/qr" component={QrCodes} />
      <PrivateRoute path="/testes" component={Teste} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
