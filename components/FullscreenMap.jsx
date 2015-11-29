'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class FullscreenMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  _setMapRef(ref) {
    this.props.gotMapRef(ref);
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div className='fullscreen-map-bkg'
            style={{
              WebkitFilter: _styleHelper(this.props.controls.mapBlur, this.props.controls.mapSaturation),
              filter: _styleHelper(this.props.controls.mapBlur, this.props.controls.mapSaturation),
              zIndex: this.props.controls.mapEnabled ? 40 : -1
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={function(ref) {
              this._setMapRef(ref);
            }.bind(this)}
            defaultZoom={6}
            options={{
              disableDefaultUI: !this.props.controls.mapEnabled,
              scrollwheel: this.props.controls.mapEnabled,
              disableDoubleClickZoom: this.props.controls.mapEnabled,
              center: {
                lat: this.props.locations.current.latitude,
                lng: this.props.locations.current.longitude
              },
              styles: _showDetailedMap(this.props.controls.mapShowDetailed)
            }}>
            {this._renderMarker(this.props.locations.from)}
            {this._renderMarker(this.props.locations.to)}
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

FullscreenMap.propTypes = {
  controls: React.PropTypes.object,
  locations: React.PropTypes.object
};

function _styleHelper(blur, saturation) {
  return 'blur(' + blur + 'px) saturate(' + saturation + ')';
}

function _showDetailedMap(showDetailed) {
  if (!showDetailed) {
    return [{
      elementType: 'labels',
      stylers: [
        {visibility: 'off'}
      ]
    }, {
      featureType: 'road',
      stylers: [
        {visibility: 'off'}
      ]
    }];
  }
  return [];
}

export default FullscreenMap;
