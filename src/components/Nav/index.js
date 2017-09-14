'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <ul className="Nav">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/counter">COUNTER from 0</Link></li>
            <li><Link to="/counter/100">COUNTER from 100</Link></li>
        </ul>
    );
};

export default Nav;
