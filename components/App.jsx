'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import locationStore from '../stores/LocationStore';
import locationActions from '../actions/LocationActions';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: locationStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });
    locationActions.load();
  }

  render() {
    return (
      <div className='app'>
        <div className='app__container'>
          {this._renderMap(this.state.locations.current)}
          <div className='magic-center magic-center--row'>
            <CSSTransitionGroup
              transitionName='generic-fade'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              transitionAppear={true}
              transitionAppearTimeout={500}>
              {this.props.children}
            </CSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }

  _renderMap(location) {
    return (
      <GoogleMapLoader
        containerElement={
          <div style={{
              height: '100vh',
              width: '100vw',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: '-100',
              WebkitFilter: 'blur(3px)',
              filter: 'blur(3px)'
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
          defaultAnimation={2} />
      );
    }
  }
}

export default App;
