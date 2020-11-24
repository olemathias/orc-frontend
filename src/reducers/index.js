import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './userReducer'
import vm from './vmReducer'
import environment from './environmentReducer'
import network from './networkReducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user,
  vm,
  environment,
  network
})

export default rootReducer
