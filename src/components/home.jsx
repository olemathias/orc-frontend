import React from 'react'
import { useSelector } from 'react-redux'

function Home () {
  const user = useSelector(state => state.user)
  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2"> Welcome { user.username } to Borg!
      </h1>

    </div>
    <p>
      <i className="fas fa-user-astronaut fa-2x"></i>
      <p><a href="https://github.com/olemathias/orc-frontend">Orc Frontend Github</a></p>
      <p><a href="https://github.com/olemathias/orc-backend">Orc Backend Github</a></p>
    </p>
  </div>)
}

export default Home
