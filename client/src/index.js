import React from 'react'
import ReactDOM from 'react-dom'
// to init redux we import { provider }.
// { provider } is going to keep track of the the global state so we can access the state from anywhere in the app. 
// Dont need to be particular to access the state, component/child component
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './App'
import './index.css';

// store meaning global state
const store = createStore(reducers, compose(applyMiddleware(thunk)))

// we pass ReactDOM the "App" component, (wrapped in "provider" which tracks state changes) 
// and the line "document.getElementById('root')", which connects to the div with an id of 'root' in "index.html"
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));