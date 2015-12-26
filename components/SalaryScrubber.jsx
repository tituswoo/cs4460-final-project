'use strict';

import React from 'react';
import Slider from 'rc-slider';

import currencyService from '../services/currencyService';

class SalaryScrubber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: this.props.salary
    };
  }

  _onChange(value) {
    this.setState({salary: value});
    this.props.onChange(value);
  }

  render() {
    return (
      <div className='salary-scrubber'>
        <p className='salary-scrubber__label'>
          I currently make {currencyService.formatAsCurrency(this.state.salary)} {this.props.suffix}
        </p>
        <Slider min={15000} max={350000} step={5000}
          defaultValue={this.props.salary}
          tipFormatter={null}
          onChange={this._onChange.bind(this)}/>
      </div>
    );
  }
}

SalaryScrubber.propTypes = {
  salary: React.PropTypes.number,
  suffix: React.PropTypes.string,
  onChange: React.PropTypes.func
};

SalaryScrubber.defaultProps = {
  salary: 15000,
  suffix: '',
  onChange: function() {}
};

export default SalaryScrubber;
