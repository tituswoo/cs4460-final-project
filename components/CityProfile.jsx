'use strict';

import React from 'react';
import MapPreview from '../components/MapPreview';
import EmoticonReportTile from '../components/EmoticonReportTile';
import scales from '../scales';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class CityProfile extends React.Component {
    render() {
      if (!this.props.city || !this.props.city.indices) {
        return (
          <div />
        );
      }
      return (
        <CSSTransitionGroup
          transitionName='generic-fade'
          transitionEnterTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          className='city-profile'>
          <div>
            <MapPreview
              title={this.props.cityMeta.city}
              subtitle={this.props.cityMeta.country}
              latitude={this.props.cityMeta.latitude}
              longitude={this.props.cityMeta.longitude}/>
            <EmoticonReportTile
              title='Cost of Living'
              rating={this.props.city.indices.cpi_index}
              scale={scales.costOfLiving}/>
            <EmoticonReportTile
              title='Purchasing Power'
              rating={this.props.city.indices.purchasing_power_incl_rent_index}
              scale={scales.qualityOfLife}/>
            <EmoticonReportTile
              title='Safety'
              rating={this.props.city.indices.safety_index}
              scale={scales.safety}/>
            <EmoticonReportTile
              title='Health Care'
              rating={this.props.city.indices.health_care_index}
              scale={scales.healthCare}/>
            <EmoticonReportTile
              title='Pollution'
              rating={this.props.city.indices.pollution_index}
              scale={scales.pollutionScale}/>
            <EmoticonReportTile
              title='Quality of Life'
              rating={this.props.city.indices.quality_of_life_index}
              scale={scales.qualityOfLife}/>
            <EmoticonReportTile
              title='Commute Time'
              rating={this.props.city.indices.traffic_index}
              remark={_trafficTimeIndexReport(this.props.city.indices.traffic_time_index)}
              icon='fa-road'/>
          </div>
        </CSSTransitionGroup>
      );
    }
}

function _trafficTimeIndexReport(trafficTimeIndex) {
  if (trafficTimeIndex) {
    return Math.floor(trafficTimeIndex) + 'min on average.';
  }

  return 'No data found.';
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
