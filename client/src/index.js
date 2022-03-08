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

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));