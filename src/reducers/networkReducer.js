import * as Actions from '../constants/actions'

const networkReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_NETWORK_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default networkReducer
