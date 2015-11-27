'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import MapPreview from '../components/MapPreview';
import EmoticonReportTile from '../components/EmoticonReportTile';
import scales from '../scales';

class CityProfile extends React.Component {
    render() {
      if (!this.props.city || !this.props.city.indices) {
        return (
          <div />
        );
      }
      console.log(this.props.city.indices);
      return (
        <div className='city-profile'>
          <MapPreview
            title={this.props.cityMeta.city}
            subtitle={this.props.cityMeta.country}
            latitude={this.props.cityMeta.latitude}
            longitude={this.props.cityMeta.longitude}/>
          <EmoticonReportTile
            title='Safety'
            rating={this.props.city.indices.safety_index}
            scale={scales.standardScale}/>
          <EmoticonReportTile
            title='Health Care'
            rating={this.props.city.indices.health_care_index}
            scale={scales.healthCare}/>
          <EmoticonReportTile
            title='Pollution'
            rating={this.props.city.indices.pollution_index}
            scale={scales.pollutionScale}/>
            <EmoticonReportTile
              title='Cost of Living'
              rating={this.props.city.indices.cpi_index}
              scale={scales.costOfLiving}/>
          <EmoticonReportTile
            title='Quality of Life'
            rating={this.props.city.indices.quality_of_life_index}
            scale={scales.qualityOfLife}/>
          <p><strong>Average time in traffic:</strong>{this.props.city.indices.traffic_index} min</p>
          <p><strong>Purchasing power:</strong>{this.props.city.indices.purchasing_power_incl_rent_index}</p>
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
