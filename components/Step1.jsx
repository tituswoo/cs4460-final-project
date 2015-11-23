'use strict';

import React from 'react';
import CityAutocomplete from '../components/CityAutocomplete';

class Step1 extends React.Component {
  render() {
    return (
      <div className='step-1'>
        <div className='step-1__question'>
          <div className='step-1__question-segment'>
            <span style={{fontWeight: 'bold'}}>Should I move</span>
            <span className='step-1__question-text'>from</span>
          </div>
          <div className='step-1__question-segment'>
            <CityAutocomplete
              onOptionSelected={this._onOptionSelected.bind(this)}
              showHint={true} />
            <span
              className='step-1__question-text'>to</span>
          </div>
          <div className='step-1__question-segment'>
            <CityAutocomplete
              onOptionSelected={this._onOptionSelected.bind(this)}
              showHint={true} />
            <span
              className='step-1__question-text'>?</span>
          </div>
        </div>
      </div>
    );
  }

  _onOptionSelected(option) {
    console.info(option);
  }

  _renderFindOutButton() {

  }
}

export default Step1;
