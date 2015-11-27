'use strict';

import React from 'react';
import CityAutocomplete from '../components/CityAutocomplete';
import {Link} from 'react-router';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';
import LoadingDialog from '../components/LoadingDialog';

import CityStore from '../stores/CityStore';
import CityActions from '../actions/CityActions';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });
    if (!CityStore.loaded) {
      CityActions.getCities();
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    if (!CityStore.loaded) {
      return (
        <LoadingDialog />
      );
    }
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
            cityList={this.state.cities.list}
            onOptionSelected={this._onOptionSelected.bind(this, 'city1')}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'city1')}
            showHint={true}
            autoFocus={true} />
          <span className='step-1__question-text'>to</span>
        </div>
        <div className='step-1__question-segment'>
          <CityAutocomplete
            cityList={this.state.cities.list}
            onOptionSelected={this._onOptionSelected.bind(this, 'city2')}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'city2')}
            showHint={true} />
          <span className='step-1__question-text'>?</span>
        </div>
        {this.state.city1 && this.state.city2 && this._renderGoToStep2Button()}
      </div>
    );
  }

  _renderGoToStep2Button() {
    return (
      <CSSTransitionGroup
        transitionName='expand-in'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <div key={1} className='step-1__question-segment step-1__question-segment--centered'>
          <Link to='step2' state={{
              city1: this.state.city1,
              city2: this.state.city2
            }}>
            <button
              className='button step-1__button'>
              <span style={{fontStyle: 'italic'}}>find out</span>
              <br /><i className='fa fa-angle-double-down'></i>
            </button>
          </Link>
        </div>
      </CSSTransitionGroup>
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
}

export default Step1;
