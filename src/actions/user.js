import Cookies from 'universal-cookie'

import * as Actions from '../constants/actions'
import * as Config from '../constants/config'

const axios = require('axios')
const cookies = new Cookies()

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: Actions.LOGIN_USER })
    return axios.post(Config.API_URL + Config.AUTH_PATH, {
      username,
      password
    }).then(
      auth => {
        cookies.set('orc.accesstoken', auth.data.access, { path: '/' })
        dispatch({ type: Actions.LOGIN_USER_SUCCESS, payload: auth.data })
      },
      err => dispatch({ type: Actions.LOGIN_USER_FAILURE, payload: err })
    )
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: Actions.LOGOUT_USER })
    cookies.remove('orc.accesstoken')
    dispatch({ type: Actions.LOGOUT_USER_SUCCESS })
  }
}
