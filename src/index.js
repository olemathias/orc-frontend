import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'
import { Provider } from 'react-redux'

const store = configureStore()

ReactDOM.render(<React.StrictMode>
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App/>
    </ConnectedRouter>
  </Provider>
</React.StrictMode>, document.getElementById('root'))
