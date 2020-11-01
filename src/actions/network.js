import store from '../store';

const axios = require('axios');

const GET_NETWORK = 'GET_NETWORK';
const GET_NETWORK_SUCCESS = 'GET_NETWORK_SUCCESS';
const GET_NETWORK_FAILURE = 'GET_NETWORK_FAILURE';

const base_url = 'http://localhost:8000/';
const network_path = 'network/';

export const getNetwork = () => {
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: GET_NETWORK
    });
    return axios.get(base_url + network_path, {
      headers: {
        'Authorization': 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: GET_NETWORK_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: GET_NETWORK_FAILURE,
        payload: err
      })
    );
  };
};
