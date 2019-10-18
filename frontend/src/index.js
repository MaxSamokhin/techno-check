import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "layouts/Login.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";
import PrivateRoute from 'components/PrivateRoute/PrivateRoute.jsx';
import {Provider} from 'react-redux';
import store from './store.js';

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline/>
    <Router history={hist}>
      <Switch>
        <PrivateRoute path="/admin" component={Admin}/>
        <Route path="/login" component={Login}/>
        <Redirect from="/" to="/admin/dashboard"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
