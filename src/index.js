import React from 'react'
import { Provider } from 'react-redux'
import Root from './components/Root'
import configureStore from './store/configureStore'
import './index.css'

const { store, history } = configureStore()

const renderApp = (RootComponent, store, history, context) => {
  return (
    <Provider store={store}>
      <RootComponent context={context} />
    </Provider>
  )
}

export default ({ context }) => {
  return renderApp(Root, store, history, context)
}
