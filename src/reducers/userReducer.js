/* eslint-disable camelcase */

import jwt_decode from 'jwt-decode'

import * as Actions from '../constants/actions'

const sessionStorage = window.sessionStorage

const defaultUser = {
  token: null,
  logged_in: false,
  isFetching: false
}

const defaultUserState = () => {
  const token = sessionStorage.getItem('orc.accesstoken')
  if (token == null) {
    return defaultUser
  }

  const decoded = jwt_decode(token)
  if (Date.now() >= decoded.exp * 1000 || decoded.username == null) {
    sessionStorage.removeItem('orc.accesstoken')
    return defaultUser
  }

  return {
    token: token,
    logged_in: true,
    isFetching: false,
    username: decoded.username,
    first_name: decoded.first_name,
    last_name: decoded.last_name
  }
}

const userReducer = (state = defaultUserState(), action) => {
  let user = {}
  switch (action.type) {
    case Actions.LOGIN_USER:
      user = {
        token: null,
        logged_in: false,
        isFetching: true
      }
      return user

    case Actions.LOGIN_USER_SUCCESS: {
      const decoded = jwt_decode(action.payload.access)
      user = {
        token: action.payload.access,
        username: decoded.username,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        logged_in: true,
        error: null,
        isFetching: false
      }
      return user
    }

    case Actions.LOGIN_USER_FAILURE: {
      user = {
        token: null,
        logged_in: false,
        error: action.payload,
        isFetching: false
      }
      return user
    }

    case Actions.LOGOUT_USER_SUCCESS: {
      return defaultUser
    }

    default: {
      return state
    }
  }
}

export default userReducer
