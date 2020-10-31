const GET_NETWORK = 'GET_NETWORK';
const GET_NETWORK_SUCCESS = 'GET_NETWORK_SUCCESS';
const GET_NETWORK_FAILURE = 'GET_NETWORK_FAILURE';

const networkReducer = (state = [], action) => {
  switch (action.type) {
    case GET_NETWORK_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default networkReducer;
