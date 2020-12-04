import * as Actions from '../constants/actions'

export const addAlert = (text, variant = 'primary') => {
  return (dispatch) => {
    dispatch({
      type: Actions.ADD_ALERT,
      payload: { variant: variant, text: text }
    })
  }
}

export const clearAlert = (idx) => {
  return (dispatch) => {
    dispatch({
      type: Actions.CLEAR_ALERT,
      payload: { idx: idx }
    })
  }
}

export const clearAllAlerts = () => {
  return (dispatch) => {
    dispatch({
      type: Actions.CLEAR_ALL_ALERTS
    })
  }
}
