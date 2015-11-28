'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import FullscreenButton from '../components/FullscreenButton';
import {Link} from 'react-router';

import locationStore from '../stores/LocationStore';
import locationActions from '../actions/LocationActions';

import environmentControlStore from '../stores/environmentControlStore';
import environmentControlActions from '../actions/environmentControlActions';

import fullscreenService from '../services/fullscreenService';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: locationStore.getInitialState(),
      controls: environmentControlStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });

    this._unsubscribeNavControls = environmentControlStore.listen((controls) => {
      this.setState({controls: controls});
    });

    locationActions.load();
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribeNavControls();
  }

  componentDidUpdate() {
    this._updateMapZoom();
  }

  _updateMapZoom() {
    // This kind of checking is ugly, but for now whatever:
    if (Object.keys(this.state.locations.from).length > 1 &&
        Object.keys(this.state.locations.to).length > 1) {

      let bounds = new google.maps.LatLngBounds();

      bounds.extend(new google.maps.LatLng({
        lat: this.state.locations.from.latitude,
        lng: this.state.locations.from.longitude
      }));
      bounds.extend(new google.maps.LatLng({
        lat: this.state.locations.to.latitude,
        lng: this.state.locations.to.longitude
      }));

      this._map.fitBounds(bounds);
    }
  }

  render() {
    return (
      <div className='app'>
        <div className='app__container'>
          { this.state.controls.fullscreenButton &&
            <FullscreenButton />
          }
          { this.state.controls.startOverButton &&
            <div className='big-control__container'>
              <Link to='step1'>
                <h1 className='big-control__button'>
                  <i className='fa fa-angle-double-up'></i><br />
                  start over
                </h1>
              </Link>
            </div>
          }
          {this._renderMap(this.state.locations.current)}
          <div className='magic-center magic-center--row'>
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  _renderMap(location) {
    return (
      <GoogleMapLoader
        containerElement={
          <div className='fullscreen-map-bkg'
            style={{
              WebkitFilter: 'blur(' + this.state.controls.mapBlur + ')',
              filter: 'blur(' + this.state.controls.mapBlur + ')'
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(ref) => {this._map = ref;}}
            defaultZoom={6}
            options={{
              draggable: false,
              disableDefaultUI: true,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              center: {
                lat: location.latitude,
                lng: location.longitude
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
            {this._renderMarker(this.state.locations.from)}
            {this._renderMarker(this.state.locations.to)}
          </GoogleMap>
        }>
      </GoogleMapLoader>
    );
  }

  _renderMarker(location) {
    if (Object.keys(location).length > 1) {
      return (
        <Marker
          position={{
            lat: location.latitude,
            lng: location.longitude
          }}
          key={location.city}
          label={{text: location.city}}
          defaultAnimation={2} />
      );
    }
  }
}

export default App;
