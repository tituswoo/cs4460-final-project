'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CityAutocomplete from '../components/CityAutocomplete';
import {Link} from 'react-router';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';
import LoadingDialog from '../components/LoadingDialog';

import CityStore from '../stores/CityStore';
import CityActions from '../actions/CityActions';

import locationStore from '../stores/LocationStore';
import locationActions from '../actions/LocationActions';

import locationService from '../services/locationService';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState(),
      locations: locationStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });
    if (!CityStore.loaded) {
      CityActions.getCities();
    }

    this._unsubscribeLocationStore = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribeLocationStore();
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
            value={locationService.normalize(this.state.locations.from)}
            cityList={this.state.cities.list}
            onOptionSelected={(option) => {
              this._to.focus();
              this._onOptionSelected('from', option);
            }}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'from')}
            showHint={true}
            autoFocus={true}
            ref={(ref) => this._from = ref} />
          <span className='step-1__question-text'>to</span>
        </div>
        <div className='step-1__question-segment'>
          <CityAutocomplete
            value={locationService.normalize(this.state.locations.to)}
            cityList={this.state.cities.list}
            onOptionSelected={this._onOptionSelected.bind(this, 'to')}
            onOptionDeselected={this._onOptionDeselected.bind(this, 'to')}
            showHint={true}
            ref={(ref) => this._to = ref} />
          <span className='step-1__question-text'>?</span>
        </div>
        {
          !_isObjectEmpty(this.state.locations.from) &&
          !_isObjectEmpty(this.state.locations.to) &&
          this._renderGoToStep2Button()
        }
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
        <div
          key={1}
          className='step-1__question-segment step-1__question-segment--centered'>
          <Link to='step2'>
            <button
              autoFocus={true}
              className='button step-1__button'>
              <span style={{fontStyle: 'italic'}}>find out</span>
              <br /><i className='fa fa-angle-double-down'></i>
            </button>
          </Link>
        </div>
      </CSSTransitionGroup>
    );
  }

  _onOptionSelected(loc, locationObject) {
    console.info('selected', loc, locationObject);
    locationActions.setLocation(loc, locationObject);
  }

  _onOptionDeselected(loc) {
    locationActions.setLocation(loc, {});
  }
}

function _isObjectEmpty(obj) {
  return Object.keys(obj).length < 1;
}

export default Step1;
