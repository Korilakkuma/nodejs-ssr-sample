'use strict';

import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Counter from './components/Counter';

export default (
    <nav>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counter} />
        <Route path="/counter/:count" component={Counter} />
    </nav>
);
