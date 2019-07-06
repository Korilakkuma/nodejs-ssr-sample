'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
// import { StaticRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';


const history        = createBrowserHistory();
const middleware     = routerMiddleware(history);
const preloadedState = JSON.parse(document.getElementById('preloadedState').getAttribute('data-state'));
const store          = createStore(rootReducer(history), preloadedState, compose(applyMiddleware(middleware)));

ReactDOM.hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {require('./routes').default}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
