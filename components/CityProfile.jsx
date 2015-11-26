'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class CityProfile extends React.Component {
    render() {
      // super ugly, try to find another way...
      if (!this.props.city ||
        !this.props.city.city_crime ||
        !this.props.city.city_healthcare ||
        !this.props.city.city_traffic ||
        !this.props.city.indices) {
        return (<div />);
      }
      return (
        <div className='city-profile'>
          <GoogleMapLoader
            containerElement={
              <div className='city-profile__map' />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => {this._map = map;}}
                defaultZoom={9}
                defaultCenter={{
                  lat: this.props.cityMeta.latitude,
                  lng: this.props.cityMeta.longitude
                }}
                options={{
                  draggable: false,
                  disableDefaultUI: true,
                  scrollwheel: false
                }}>
              </GoogleMap>
            }>
          </GoogleMapLoader>
          <h2 className='city-profile__title'>{this.props.city.indices.name}</h2>
        </div>
      );
    }
}

CityProfile.defaultProps = {
  city: [],
  cityMeta: {}
};

CityProfile.propTypes = {
  city: React.PropTypes.array,
  cityMeta: React.PropTypes.object
};

export default CityProfile;
