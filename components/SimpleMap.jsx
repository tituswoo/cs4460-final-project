'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

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
      <div>TEst</div>
    );
    /*return (
      <GoogleMapLoader
        containerElement={
          <div className='SimpleMap'>
          </div>
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={this.props.defaultZoom}
            defaultCenter={this.state.currentLocation}
            onClick={this.onMapClick}
            ref={(map) => {this._map = map;}}>
          </GoogleMap>
        }>
        {this.props.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
              onRightclick={() => this.props.onMarkerRightclick(index)} />
          );
        })}
      </GoogleMapLoader>
    );*/
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
    //var map = ReactDOM.findDOMNode(this.refs.map);
    //window.google.maps.event.trigger(map, 'resize');
  }

  onMapClick() {
    //console.info('Bam! Clicked on the map, yo.');
  }
}

SimpleMap.defaultProps = {
  markers: []
};

export default SimpleMap;
