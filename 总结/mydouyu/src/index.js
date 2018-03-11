import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, hashHistory } from 'react-router'
import configureStore from './configureStore'
import routes from './routes'
const store = configureStore(window.__data || {});
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({ routes, location }, () => {
    render(
        <Provider store={store}>
            <Router routes={routes} history={hashHistory } />
        </Provider>,
        document.getElementById('root')
    )
})