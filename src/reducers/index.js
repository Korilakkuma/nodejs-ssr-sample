'use strict';

import { combineReducers } from 'redux';

function count(state = 0, action) {
    switch (action.type) {
        case 'COUNT':
            return action.count;
        default:
            return state;
    }
}

const reducers = combineReducers({ count });

export default reducers;
