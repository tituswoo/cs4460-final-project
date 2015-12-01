'use strict';

import React from 'react';
import Slider from 'rc-slider';

class SalaryScrubber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 15000
    };
  }

  _onChange(value) {
    this.setState({salary: value});
  }

  render() {
    return (
      <div className='salary-scrubber'>
        <p className='salary-scrubber__label'>I currently make {_formatAsCurrency(this.state.salary)}</p>
        <Slider min={10000} max={300000} step={5000}
          defaultValue={this.state.salary}
          tipFormatter={_formatAsCurrency}
          onChange={this._onChange.bind(this)}/>
      </div>
    );
  }
}

function _formatAsCurrency(value) {
  let processed = String(value).split('');
  processed.splice(String(value).length - 3, 0, ',');
  processed = processed.join('');
  return '$' + processed;
}

export default SalaryScrubber;
