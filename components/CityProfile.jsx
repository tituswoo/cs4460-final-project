'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import MapPreview from '../components/MapPreview';

class CityProfile extends React.Component {
    render() {
      // super ugly, try to find another way...
      if (!this.props.city || !this.props.city.indices) {
        return (<div />);
      }
      console.log(this.props.cityMeta);
      return (
        <div className='city-profile'>
          <MapPreview
            title={this.props.cityMeta.city}
            subtitle={this.props.cityMeta.country}
            latitude={this.props.cityMeta.latitude}
            longitude={this.props.cityMeta.longitude} />
          <p><strong>Safety:</strong>{this.props.city.indices.safety_index}</p>
          <p><strong>Average time in traffic:</strong>{this.props.city.indices.traffic_index} min</p>
          <p><strong>Happiness:</strong>{this.props.city.indices.quality_of_life_index}</p>
          <p><strong>Pollution:</strong>{this.props.city.indices.pollution_index}</p>
          <p><strong>Purchasing power:</strong>{this.props.city.indices.purchasing_power_incl_rent_index}</p>
          <p><strong>Cost of living:</strong>{this.props.city.indices.cpi_index}</p>
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
