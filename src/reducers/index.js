import
{
  combineReducers
}
from 'redux'

import user from './userReducer'
import vm from './vmReducer'
import environment from './environmentReducer'
import network from './networkReducer'

const rootReducer = combineReducers(
{
  user,
  vm,
  environment,
  network
});

export default rootReducer;
