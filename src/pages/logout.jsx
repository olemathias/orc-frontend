import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/user';

function Logout() {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return <Redirect to='/login' />;
}

export default Logout;
