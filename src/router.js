/* router.js */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './components/home'
import Login from './components/User/login'
import Logout from './components/User/logout'

import Vm from './components/Vm/vm'
import VmCreate from './components/Vm/vm_create'
import VmShow from './components/Vm/vm_show'

import Environment from './components/Environment/environment'

import Error404 from './components/404'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user)
  if (!user.logged_in) {
    return <Redirect to='/login' />
  }
  return <Component {...rest} />
}

const AppRouter = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute exact path='/logout' component={Logout} />
    <PrivateRoute exact path='/vm/' component={Vm} />
    <PrivateRoute exact path='/vm/create' component={VmCreate} />
    <PrivateRoute exact path='/vm/:id(\d+)' component={VmShow} />
    <PrivateRoute exact path='/environment/' component={Environment} />
    <Route component={Error404} />
  </Switch>
)

export default AppRouter
