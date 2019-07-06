'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
// import { StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import rootReducer from './reducers';
import express from 'express';
import logger from 'morgan';

const app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    render(req, res, '', 'Home Page');
});

app.get('/counter', (req, res) => {
    render(req, res, 'COUNTER from 0 | ', 'Count Page');
});

app.get('/counter/:count', (req, res) => {
    render(req, res, `COUNTER from ${req.params.count} | `, `Count Page from ${req.params.count}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});

function render(req, res, title, description) {
    const history        = createMemoryHistory({ initialEntries: [req.url], initialIndex: 0 });
    const middleware     = routerMiddleware(history);
    const store          = createStore(rootReducer(history), compose(applyMiddleware(middleware)));
    const state          = store.getState();
    const preloadedState = JSON.stringify(state).replace(/</g, '\\u003c');

    ReactDOMServer.renderToNodeStream(
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>{title}SPA with Redux</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="stylesheet" href="/app.css" type="text/css" media="all" />
            </head>
            <body>
                <div id="app">
                    <Provider store={store}>
                        <ConnectedRouter history={history}>
                            {require('./routes').default}
                        </ConnectedRouter>
                    </Provider>
                </div>
                <script type="text/javascript" id="preloadedState" data-state={preloadedState} />
                <script type="text/javascript" src="/app.js" />
            </body>
        </html>
    ).pipe(res);
};
