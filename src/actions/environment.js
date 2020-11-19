import store from '../store'

import * as Actions from '../constants/actions'
import * as Config from '../constants/config'

const axios = require('axios')

export const getEnvironment = () => {
  const user = store.getState().user
  return (dispatch) => {
    dispatch({
      type: Actions.GET_ENVIRONMENT
    })
    return axios.get(Config.API_URL + Config.ENVIROMENT_PATH, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(
      resp => dispatch({
        type: Actions.GET_ENVIRONMENT_SUCCESS,
        payload: resp.data
      }),
      err => dispatch({
        type: Actions.GET_ENVIRONMENT_FAILURE,
        payload: err
      })
    )
  }
}
