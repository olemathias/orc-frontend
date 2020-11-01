import {Redirect} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../actions/user';

function Login() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  let handle_login = function(e) {
    let username = e.target[0].value
    let password = e.target[1].value
    dispatch(loginUser(username, password));
    e.preventDefault();
  };

  if(user.logged_in) {
    return <Redirect to='/'/>;
  }

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Please log in!</h1>
    </div>
    <form onSubmit={e => handle_login(e)}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" name="username"/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" name="password"/>
      </div>
      <input className="btn btn-primary" type="submit" value="Login"/>
    </form>
  </div>)
}

export default Login;
