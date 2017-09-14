'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../../actions';


class Counter extends React.Component {
    static CLASS_NAME = 'Counter';

    static propTypes = {
        dispatch : PropTypes.func.isRequired,
        count    : PropTypes.number.isRequired,
        match    : PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    onClickUpButton() {
        this.props.dispatch(Actions.count(this.props.count + 1));
    }

    onClickDownButton() {
        this.props.dispatch(Actions.count(this.props.count - 1));
    }

    render() {
        const count = (this.props.match && this.props.match.params) ? parseInt(this.props.match.params.count) : 0;

        let currentCount;

        if (isNaN(count)) {
            currentCount = this.props.count;
        } else {
            currentCount = this.props.count + count;
        }

        return (
          <div className={Counter.CLASS_NAME}>
              <p>
                  <button type="button" className={`${Counter.CLASS_NAME}__up Button`} onClick={this.onClickUpButton.bind(this)}>+</button>
                  <button type="button" className={`${Counter.CLASS_NAME}__down Button`} onClick={this.onClickDownButton.bind(this)}>-</button>
              </p>
              <p>
                  <span className={`${Counter.CLASS_NAME}__count`}>{currentCount}</span>
              </p>
          </div>
        );
    }
}

export default connect(state => state)(Counter);
