import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Main router
import AppRouter from './router'

// Base components
import TopBar from './components/Base/topbar'
import SideBar from './components/Base/sidebar'

import './App.scss'

library.add(fas, far)

class App extends React.Component {
  render () {
    return (
      <Router>
        <TopBar/>
        <div className="container-fluid">
          <div className="row">
            <SideBar/>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <AppRouter/>
            </main>
          </div>
        </div>
      </Router>
    )
  };
}

export default App
