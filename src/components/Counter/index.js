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

        this.initialCount = (props.match && props.match.params) ? parseInt(props.match.params.count) : 0;
    }

    onClickUpButton() {
        this.props.dispatch(Actions.count(this.props.count + 1));
    }

    onClickDownButton() {
        this.props.dispatch(Actions.count(this.props.count - 1));
    }

    componentWillUnmount() {
        this.props.dispatch(Actions.count(0));
    }

    render() {
        let count;

        if (isNaN(this.initialCount)) {
            count = this.props.count;
        } else {
            count = this.props.count + this.initialCount;
        }

        return (
          <div className={Counter.CLASS_NAME}>
              <p>
                  <button type="button" className={`${Counter.CLASS_NAME}__up Button`} onClick={this.onClickUpButton.bind(this)}>+</button>
                  <button type="button" className={`${Counter.CLASS_NAME}__down Button`} onClick={this.onClickDownButton.bind(this)}>-</button>
              </p>
              <p>
                  <span className={`${Counter.CLASS_NAME}__count`}>{count}</span>
              </p>
          </div>
        );
    }
}

export default connect(state => state)(Counter);
