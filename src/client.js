'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from './reducers';

const preloadedStete = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(reducers, preloadedStete);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {require('./routes').default}
        </Router>
    </Provider>,
    document.getElementById('app')
);
