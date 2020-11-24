import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

export default function configureStore () {
  const rootStore = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        thunk,
        routerMiddleware(history)
      )
    )
  )

  return rootStore
}
