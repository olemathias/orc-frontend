import * as Actions from '../constants/actions'

const environmentReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_ENVIRONMENT_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default environmentReducer
