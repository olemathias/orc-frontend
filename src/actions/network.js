import configureStore from '../store'

import * as Actions from '../constants/actions'
import * as Config from '../constants/config'

const axios = require('axios')

export const getNetwork = () => {
  const store = configureStore()
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: Actions.GET_NETWORK
    })
    return axios.get(Config.API_URL + Config.NETWORK_PATH, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: Actions.GET_NETWORK_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: Actions.GET_NETWORK_FAILURE,
        payload: err
      })
    )
  }
}
