'use strict';

import React from 'react';
import CityAutocomplete from '../components/CityAutocomplete';
import {Link} from 'react-router';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

import CityStore from '../stores/CityStore';
import CityActions from '../actions/CityActions';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState(),
      currentLocation: {
        lat: 36.703660,
        lng: -100.371094
      }
    };
  }

  componentDidMount() {
    this._unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });
    if (!CityStore.loaded) {
      CityActions.getCities();
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _renderMap() {
    console.log('rendering...');
    return (
      <GoogleMapLoader
        containerElement={
          <div style={{
              height: '100vh',
              width: '100vw',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: '-100'
            }} />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => {this._map = map;}}
            defaultZoom={6}
            options={{
              draggable: false,
              disableDefaultUI: true,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              center: {
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng
              },
              styles: [{
                elementType: 'labels',
                stylers: [
                  {visibility: 'off'}
                ]
              }, {
                featureType: 'road',
                stylers: [
                  {visibility: 'off'}
                ]
              }]
            }}>
          </GoogleMap>
        }>
      </GoogleMapLoader>
    );
  }

  render() {
    return (
      <div className='step-1__question'>
        {Object.keys(this.state.currentLocation).length > 1 && this._renderMap()}
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
            showHint={true} />
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
        {this.state.city1 && this.state.city2 &&
          <div
            key={1}
            className='step-1__question-segment step-1__question-segment--centered'
            style={{marginTop: '5vh'}}>
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
}

export default Step1;
