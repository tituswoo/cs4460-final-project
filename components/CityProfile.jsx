'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import MapPreview from '../components/MapPreview';
import EmoticonReportTile from '../components/EmoticonReportTile';

class CityProfile extends React.Component {
    render() {
      // super ugly, try to find another way...
      if (!this.props.city || !this.props.city.indices) {
        return (<div />);
      }
      console.log(this.props.city.indices);
      return (
        <div className='city-profile'>
          <MapPreview
            title={this.props.cityMeta.city}
            subtitle={this.props.cityMeta.country}
            latitude={this.props.cityMeta.latitude}
            longitude={this.props.cityMeta.longitude} />
          <EmoticonReportTile
            title='Safety'
            rating={this.props.city.indices.safety_index}
            scale={[
              {
                from: 0, to: 20,
                remark: 'Very low',
                icon: 'fa-frown-o'
              },
              {
                from: 20, to: 40,
                remark: 'Low',
                icon: 'fa-frown-o'
              },
              {
                from: 40, to: 55,
                remark: 'Moderate',
                icon: 'fa-meh-o'
              },
              {
                from: 60, to: 80,
                remark: 'High',
                icon: 'fa-smile-o'
              },
              {
                from: 80, to: 100,
                remark: 'Very high',
                icon: 'fa-smile-o'
              }
            ]}/>
          <EmoticonReportTile
            title='Health Care'
            rating={this.props.city.indices.health_care_index}
            scale={[
              {
                from: 0, to: 40,
                remark: 'Low',
                icon: 'fa-frown-o'
              },
              {
                from: 40, to: 60,
                remark: 'Moderate',
                icon: 'fa-meh-o'
              },
              {
                from: 60, to: 80,
                remark: 'High',
                icon: 'fa-smile-o'
              },
              {
                from: 80, to: 100,
                remark: 'Very high',
                icon: 'fa-smile-o'
              }
            ]}/>
          <EmoticonReportTile
            title='Quality of Life'
            rating={this.props.city.indices.quality_of_life_index}
            scale={[
              {
                from: 0, to: 35,
                remark: 'Very low',
                icon: 'fa-frown-o'
              },
              {
                from: 35, to: 65,
                remark: 'Low',
                icon: 'fa-frown-o'
              },
              {
                from: 65, to: 100,
                remark: 'Medium',
                icon: 'fa-meh-o'
              },
              {
                from: 100, to: 135,
                remark: 'High',
                icon: 'fa-smile-o'
              },
              {
                from: 135, to: 200,
                remark: 'Very high',
                icon: 'fa-smile-o'
              }
            ]}/>

          <p><strong>Average time in traffic:</strong>{this.props.city.indices.traffic_index} min</p>
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
