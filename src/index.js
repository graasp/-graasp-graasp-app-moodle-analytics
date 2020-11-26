import React from 'react'
import { Provider } from 'react-redux'
import Root from './components/Root'
import configureStore from './store/configureStore'
import './index.css'

const renderApp = (RootComponent, store, history, context) => {
  return (
    <Provider store={store}>
      <RootComponent context={context} />
    </Provider>
  )
}

// eslint-disable-next-line import/prefer-default-export
export const Analytics = ({ context }) => {
  const { store, history } = configureStore()
  return renderApp(Root, store, history, context)
}
