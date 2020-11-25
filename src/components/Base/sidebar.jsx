import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import * as Config from '../../constants/config'

import Navbar from 'react-bootstrap/Navbar'

function SideBar () {
  const user = useSelector(state => state.user)
  let userNavBar

  if (user.logged_in) {
    userNavBar = (
      <div>
        <li className="nav-item">
          <Link className="nav-link" to="/environment">Environments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vm">VM</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={Config.ADMIN_URL}>Admin</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={Config.DJANGORQ_URL}>Django RQ</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={Config.API_URL}>Rest API</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-md-none" to="/logout">Sign out</Link>
        </li>
      </div>
    )
  }

  return (
    <Navbar expand="md">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="d-md-none" />
      <Navbar.Collapse id="responsive-navbar-nav" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="d-md-none" />
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {userNavBar}
          </ul>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SideBar
