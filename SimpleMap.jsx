import React from 'react';
import {GoogleMap, Marker} from 'react-google-maps';

class SimpleMap extends React.Component {
  render() {
    return (
      <GoogleMap containerProps={{
          className: 'SimpleMap'
        }}
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
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

  onMapClick() {
    console.info('Bam! Clicked on the map, yo.');
  }
}

export default SimpleMap;
