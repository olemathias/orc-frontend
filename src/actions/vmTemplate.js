import configureStore from '../store'

import * as Actions from '../constants/actions'
import * as Config from '../constants/config'

const axios = require('axios')

export const getVMTemplate = () => {
  const store = configureStore()
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: Actions.GET_VM_TEMPLATE
    })
    return axios.get(Config.API_URL + Config.VM_TEMPLATE_PATH, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: Actions.GET_VM_TEMPLATE_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: Actions.GET_VM_TEMPLATE_FAILURE,
        payload: err
      })
    )
  }
}
