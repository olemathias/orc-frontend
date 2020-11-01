import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

//const LOGOUT_USER = 'LOGOUT_USER';
const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

const cookies = new Cookies();

const defaultUser = {
  token: null,
  logged_in: false,
  isFetching: false
};

const defaultUserState = () => {
  let token = cookies.get('orc.accesstoken');
  if (token == null) {
    return defaultUser;
  };
  let decoded = jwt_decode(token);
  if (Date.now() >= decoded.exp * 1000 || decoded.username == null) {
    cookies.remove('orc.accesstoken');
    return defaultUser;
  }
  return {
    token: token,
    logged_in: true,
    isFetching: false,
    username: decoded.username,
    first_name: decoded.first_name,
    last_name: decoded.last_name
  };
}

const userReducer = (state = defaultUserState(), action) => {
  let user = {};
  switch (action.type) {
    case LOGIN_USER:
      user = {
        token: null,
        logged_in: false,
        isFetching: true
      };
      return user;

    case LOGIN_USER_SUCCESS:
      let decoded = jwt_decode(action.payload.access);
      user = {
        token: action.payload.access,
        username: decoded.username,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        logged_in: true,
        error: null,
        isFetching: false
      };
      return user;

    case LOGIN_USER_FAILURE:
      user = {
        token: null,
        logged_in: false,
        error: action.payload,
        isFetching: false
      };
      return user;

    case LOGOUT_USER_SUCCESS:
      return defaultUser;

    default:
      return state;
  };
};

export default userReducer;
