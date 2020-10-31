import store from '../store';

const axios = require('axios');

const GET_VM = 'GET_VM';
const GET_VM_SUCCESS = 'GET_VM_SUCCESS';
const GET_VM_FAILURE = 'GET_VM_FAILURE';

const base_url = 'http://localhost:8000/';
const vm_path = 'vm/';

export const getVM = () => {
  const user = store.getState().user
  return (dispatch) => {
    dispatch({ type: GET_VM });
    return axios.get(base_url+vm_path, {headers: {'Authorization': 'JWT '+user.token}}).then(
      resp => dispatch({ type: GET_VM_SUCCESS, payload: resp.data }),
      err => dispatch({ type: GET_VM_FAILURE, payload: err })
    );
  };
};
