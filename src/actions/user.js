import * as Actions from '../constants/actions'
import * as Config from '../constants/config'
import { addAlert, clearAllAlerts } from '../actions/alert'

const axios = require('axios')
const sessionStorage = window.sessionStorage

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: Actions.LOGIN_USER })
    return axios.post(Config.API_URL + Config.AUTH_PATH, {
      username,
      password
    }).then(
      auth => {
        sessionStorage.setItem('orc.accesstoken', auth.data.access)
        dispatch({ type: Actions.LOGIN_USER_SUCCESS, payload: auth.data })
        dispatch(clearAllAlerts())
        dispatch(addAlert('Logged in as ' + username + '!'))
      },
      err => {
        dispatch({ type: Actions.LOGIN_USER_FAILURE, payload: err })
        dispatch(clearAllAlerts())
        dispatch(addAlert('Login failed!', 'danger', false))
      }
    )
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: Actions.LOGOUT_USER })
    sessionStorage.removeItem('orc.accesstoken')
    dispatch({ type: Actions.LOGOUT_USER_SUCCESS })
    dispatch(clearAllAlerts())
    dispatch(addAlert('You are now logged out!'))
  }
}
