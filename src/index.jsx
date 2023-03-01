
import * as  React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App.jsx'
import store from './store'
import  { Provider } from 'react-redux'
import { Store } from "redux";
import {  BrowserRouter } from 'react-router-dom'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
