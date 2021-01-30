import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './userReducer'
import vm from './vmReducer'
import platform from './platformReducer'
import network from './networkReducer'
import vmTemplate from './vmTemplateReducer'
import alert from './alertReducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user,
  vm,
  platform,
  network,
  vmTemplate,
  alert
})

export default rootReducer
