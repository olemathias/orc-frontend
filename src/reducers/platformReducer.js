import * as Actions from '../constants/actions'

const platformReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_ENVIRONMENT_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default platformReducer
