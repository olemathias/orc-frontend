import * as Actions from '../constants/actions'

export const addAlert = (text, variant = 'primary', autoclose = true) => {
  return (dispatch) => {
    let uid = (Math.random() * 46656) | 0
    uid = ('000' + uid.toString(36)).slice(-3)
    if (autoclose) {
      setTimeout(() => {
        dispatch(clearAlert(uid))
      }, 5000)
    }
    dispatch({
      type: Actions.ADD_ALERT,
      payload: { uid: uid, text: text, variant: variant }
    })
  }
}

export const clearAlert = (uid) => {
  return (dispatch) => {
    dispatch({
      type: Actions.CLEAR_ALERT,
      payload: { uid: uid }
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
