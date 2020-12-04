import * as Actions from '../constants/actions'

const alertReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_ALERT:
      return state.concat([action.payload])
    case Actions.CLEAR_ALERT:
      return state.filter((obj) => { return action.payload.uid !== obj.uid })
    case Actions.CLEAR_ALL_ALERTS:
      return []
    default:
      return state
  }
}

export default alertReducer
