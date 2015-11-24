'use strict';

import React from 'react';
import CityAutocomplete from '../components/CityAutocomplete';
import {Link} from 'react-router';
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='step-1__question'>
        <div className='step-1__question-segment'>
          <span
            className='step-1__question-text'
            style={{fontWeight: 'bold', marginLeft: 0}}>Should I move</span>
          <span className='step-1__question-text'>from</span>
        </div>
        <div className='step-1__question-segment'>
          <CityAutocomplete
            onOptionSelected={this._onOptionSelected.bind(this, 'city1')}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'city1')}
            showHint={true} />
          <span className='step-1__question-text'>to</span>
        </div>
        <div className='step-1__question-segment'>
          <CityAutocomplete
            onOptionSelected={this._onOptionSelected.bind(this, 'city2')}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'city2')}
            showHint={true} />
          <span className='step-1__question-text'>?</span>
        </div>
        {this.state.city1 && this.state.city2 &&
          <div
            key={1}
            className='step-1__question-segment step-1__question-segment--centered'
            style={{marginTop: '5vh'}}>
            <Link to='step2'>
              <button
                className='button step-1__button'>
                <span style={{fontStyle: 'italic'}}>find out</span>
                <br /><i className='fa fa-angle-double-down'></i>
              </button>
            </Link>
          </div>
        }
      </div>
    );
  }

  _onOptionSelected(city, option) {
    this.setState({
      [city]: option
    });
  }

  _onOptionDeselected(city, option) {
    this.setState({
      [city]: false
    });
  }

  _renderFindOutButton() {

  }
}

export default Step1;
