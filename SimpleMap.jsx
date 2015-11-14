import React from 'react';
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
        defaultZoom={12}
        center={this.state.currentLocation}
        onClick={this.props.onMapClick}
      >
        {this.props.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
              onRightclick={() => props.onMarkerRightclick(index)} />
          );
        })}
      </GoogleMap>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log(location);
      this.setState({
        currentLocation: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      });
    }.bind(this));
  }

  onMapClick() {
    console.info('Bam! Clicked on the map, yo.');
  }
}

export default SimpleMap;
