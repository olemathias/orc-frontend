import * as Actions from '../constants/actions'

const vmReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_VM_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default vmReducer
