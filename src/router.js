/* router.js */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";

import Vm from "./pages/vm";
import VmCreate from "./pages/vm_create";

import Error404 from "./pages/404";

const RequireAuth = ({ children }) => {
  const user = useSelector(state => state.user);
  if (!user.logged_in) {
    return <Redirect to='/login' />;
  }
  return children;
};

const AppRouter = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <RequireAuth>
      <Route exact path='/' component={Home} />
      <Route exact path='/logout' component={Logout} />
      <Route exact path='/vm/' component={Vm} />
      <Route exact path='/vm/create' component={VmCreate} />
      <Route exact path='/vm/:id(\\d+)' component={Vm} />
    </RequireAuth>
    <Route component={Error404} />
  </Switch>
);

export default AppRouter;
