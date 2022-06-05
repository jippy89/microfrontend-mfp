import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
// Used by react-router-dom
// So you dont have to install
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory()

  // Temporary fix, will update again later
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} />, el)

  return {
    onParentNavigate (location) {
      const { pathname: nextPathName } = location
      const { pathname: currentPathName } = history.location

      // To prevent infinite loop because of 2 way interaction
      // 1. Browser History -> Memory History
      // 2. Memory History -> Browser History
      if (currentPathName !== nextPathName) {
        console.log('Noticed container navigated')
        history.push(nextPathName)
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('_auth-dev-root')
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }