'use strict';

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

function count(state = 0, action) {
    switch (action.type) {
        case 'COUNT':
            return action.count;
        default:
            return state;
    }
}

export default (history) => combineReducers({
    count,
    router: connectRouter(history)
});
