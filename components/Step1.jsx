'use strict';

import React from 'react';

class Step1 extends React.Component {
  render() {
    return (
      <div className='step-1'>
        <h1 className='step-1__question'>
          <span className='step-1__question-text'>Should I move from</span>
          <p className='step-1__question-segment'>
            <input className='input' type='text' />
            <span style={{marginRight: 10}}>to</span>
            <input className='input' type='text' />?
          </p>
        </h1>
      </div>
    );
  }
}

export default Step1;
