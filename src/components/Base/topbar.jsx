import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

function TopBar () {
  const user = useSelector(state => state.user)
  let userBar

  if (user.logged_in) {
    userBar = (<ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/logout">Sign out</Link>
        </li>
      </ul>
    )
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">Orc <small>ALPHA</small>
      </Link>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {userBar}
    </nav>)
}

export default TopBar
