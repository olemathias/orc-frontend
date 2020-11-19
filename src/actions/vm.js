import store from '../store'

import * as Actions from '../constants/actions'
import * as Config from '../constants/config'

const axios = require('axios')

export const getVM = () => {
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: Actions.GET_VM
    })
    return axios.get(Config.API_URL + Config.VM_PATH, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: Actions.GET_VM_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: Actions.GET_VM_FAILURE,
        payload: err
      })
    )
  }
}
