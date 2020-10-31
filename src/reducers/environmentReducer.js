const GET_ENVIRONMENT = 'GET_ENVIRONMENT';
const GET_ENVIRONMENT_SUCCESS = 'GET_ENVIRONMENT_SUCCESS';
const GET_ENVIRONMENT_FAILURE = 'GET_ENVIRONMENT_FAILURE';

const environmentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ENVIRONMENT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default environmentReducer;
