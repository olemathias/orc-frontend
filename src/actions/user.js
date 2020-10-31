import Cookies from 'universal-cookie';
const axios = require('axios');

const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

const LOGOUT_USER = 'LOGOUT_USER';
const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

const base_url = 'http://localhost:8000/';
const auth_path = 'api-token-auth/';
const refresh_path = 'api-token-refresh/';
const verify_path = 'api-token-verify/';

const cookies = new Cookies();

export const initUser = () => {
  if(cookies.get('orc.authtoken') == null){
    return (dispatch) => {};
  };
  return (dispatch) => {
    return axios.post(base_url+verify_path, {
        token: cookies.get('orc.authtoken')
    }).then(
      auth => dispatch({ type: LOGIN_USER_SUCCESS, payload: auth.data }),
      err => dispatch({ type: LOGIN_USER_FAILURE, payload: err })
    );
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    return axios.post(base_url+auth_path, {
        username,
        password
    }).then(
      auth => {
        cookies.set('orc.authtoken', auth.data.token, { path: '/' });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: auth.data });
      },
      err => dispatch({ type: LOGIN_USER_FAILURE, payload: err })
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    cookies.remove('orc.authtoken');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  };
};
