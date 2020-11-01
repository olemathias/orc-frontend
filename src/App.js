import {BrowserRouter as Router} from "react-router-dom";
import {useSelector} from 'react-redux';

// Font Awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

// Main router
import AppRouter from './router';

// Base components
import TopBar from "./components/topbar";
import SideBar from "./components/sidebar";

import './App.scss';

library.add(fas, far)

function App() {
  const user = useSelector(state => state.user);
  return (<Router>
    <TopBar user={user}/>
    <div className="container-fluid">
      <div className="row">
        <SideBar user={user}/>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <AppRouter/>
        </main>
      </div>
    </div>
  </Router>);
};

export default App;
