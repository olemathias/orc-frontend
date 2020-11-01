import store from '../store';

const axios = require('axios');

const GET_ENVIRONMENT = 'GET_ENVIRONMENT';
const GET_ENVIRONMENT_SUCCESS = 'GET_ENVIRONMENT_SUCCESS';
const GET_ENVIRONMENT_FAILURE = 'GET_ENVIRONMENT_FAILURE';

const base_url = 'http://localhost:8000/';
const environment_path = 'environment/';

export const getEnvironment = () => {
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: GET_ENVIRONMENT
    });
    return axios.get(base_url + environment_path, {
      headers: {
        'Authorization': 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: GET_ENVIRONMENT_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: GET_ENVIRONMENT_FAILURE,
        payload: err
      })
    );
  };
};
