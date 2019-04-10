'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from './reducers';

const preloadedState = JSON.parse(document.querySelector('script').getAttribute('data-state'));

const store = createStore(reducers, preloadedState);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            {require('./routes').default}
        </Router>
    </Provider>,
    document.getElementById('app')
);
