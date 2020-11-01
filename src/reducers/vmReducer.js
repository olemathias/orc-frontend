//const GET_VM = 'GET_VM';
const GET_VM_SUCCESS = 'GET_VM_SUCCESS';
//const GET_VM_FAILURE = 'GET_VM_FAILURE';

const vmReducer = (state = [], action) =>
{
  switch (action.type)
  {
    case GET_VM_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default vmReducer;
