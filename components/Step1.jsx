'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CityAutocomplete from '../components/CityAutocomplete';
import {Link} from 'react-router';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';
import LoadingDialog from '../components/LoadingDialog';

import cityStore from '../stores/cityStore';
import cityActions from '../actions/cityActions';

import locationStore from '../stores/locationStore';
import locationActions from '../actions/locationActions';

import locationService from '../services/locationService';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityStore.getInitialState(),
      locations: locationStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = cityStore.listen((cities) => {
      this.setState({cities: cities});
    });
    if (!cityStore.loaded) {
      cityActions.getCities();
    }

    this._unsubscribelocationStore = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribelocationStore();
  }

  render() {
    if (!cityStore.loaded) {
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
            onOptionSelected={(option) => {
              if (this._linkBtn) {
                ReactDOM.findDOMNode(this._linkBtn).focus();
              }
              this._onOptionSelected('to', option);
            }}
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
          <Link to='step2' tabIndex='-1'>
            <button
              autoFocus={true}
              className='button step-1__button'
              ref={(ref) => this._linkBtn = ref}>
              <span style={{fontStyle: 'italic'}}>find out</span>
              <br /><i className='fa fa-angle-double-down'></i>
            </button>
          </Link>
        </div>
      </CSSTransitionGroup>
    );
  }

  _onOptionSelected(loc, locationObject) {
    locationActions.setLocation(loc, locationObject);
  }

  _onOptionDeselected(loc) {
    // do nothing right now.
  }
}

function _isObjectEmpty(obj) {
  return Object.keys(obj).length < 1;
}

export default Step1;
