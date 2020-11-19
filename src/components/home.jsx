import React from 'react'
import { useSelector } from 'react-redux'

function Home () {
  const user = useSelector(state => state.user)
  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">
        {
          user.logged_in
            ? ('Welcome ' + user.username + '!')
            : ('Please sign in!')
        }
      </h1>

    </div>
    <p>
      <i className="fas fa-user-astronaut fa-2x"></i>
      This is still a very early prototype
    </p>
  </div>)
}

export default Home
