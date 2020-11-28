import * as Actions from '../constants/actions'

const vmTemplateReducer = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_VM_TEMPLATE_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default vmTemplateReducer
