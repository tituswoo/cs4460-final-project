'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default current location to middle of USA:
      currentLocation: {
        lat: 36.703660,
        lng: -100.371094
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <div className='app__container'>
          {this._renderMap()}
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

  _renderMap() {
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
}

export default App;
