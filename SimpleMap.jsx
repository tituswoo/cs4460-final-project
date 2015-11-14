'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleMap, Marker} from 'react-google-maps';

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 0,
        lng: 0
      }
    };
  }

  render() {
    return (
      <GoogleMap containerProps={{
          className: 'SimpleMap'
        }}
        defaultZoom={this.props.defaultZoom}
        center={this.state.currentLocation}
        onClick={this.onMapClick}
        ref='map'
      >
        {this.props.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
              onRightclick={() => this.props.onMarkerRightclick(index)} />
          );
        })}
      </GoogleMap>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        currentLocation: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      });
    });
  }

  componentDidUpdate() {
    var map = ReactDOM.findDOMNode(this.refs.map);
    window.google.maps.event.trigger(map, 'resize');
  }

  onMapClick() {
    console.info('Bam! Clicked on the map, yo.');
  }
}

SimpleMap.defaultProps = {
  markers: []
};

export default SimpleMap;
