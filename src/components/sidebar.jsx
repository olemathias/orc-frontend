import React from "react";
import {Link} from 'react-router-dom'

class SideBar extends React.Component {
  render() {
    let userNavBar;
    if (this.props.user.logged_in) {
      userNavBar = (
      <div>
        <li className="nav-item">
          <Link className="nav-link" to="/environment">Environments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vm">VM</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/django-rq">Django RQ</Link>
        </li>
      </div>
      )
    }

    return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {userNavBar}
        </ul>
      </div>
    </nav>
    );
  }
}

export default SideBar;
