import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Main router
import AppRouter from './router'

// Store
import store from './store'

import { getVM } from './actions/vm'

// Base components
import TopBar from './components/Base/topbar'
import SideBar from './components/Base/sidebar'

import './App.scss'

library.add(fas, far)

class App extends React.Component {
  componentDidMount () {
    store.dispatch(getVM())
  }

  render () {
    const user = store.getState().user
    return (
      <Router>
        <TopBar user={user}/>
        <div className="container-fluid">
          <div className="row">
            <SideBar user={user}/>
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
