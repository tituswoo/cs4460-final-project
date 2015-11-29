'use strict';

import React from 'react';
import MapPreview from '../components/MapPreview';
import EmoticonReportTile from '../components/EmoticonReportTile';
import scales from '../scales';

class CityProfile extends React.Component {
    render() {
      return (
        <div className='city-profile'>
          <MapPreview
            title={this.props.cityMeta.city}
            subtitle={this.props.cityMeta.country}
            latitude={this.props.cityMeta.latitude}
            longitude={this.props.cityMeta.longitude}/>
          {this._renderReportTiles(this.props.cityReport)}
        </div>
      );
    }

    _renderReportTiles(report) {
      return report.map((cat) => {
        return (
          <EmoticonReportTile
            title={cat.name}
            rating={cat.rating}
            remark={cat.remark}
            icon={cat.icon}
            customClasses={cat.className}
            key={cat.rating + cat.key}/>
        );
      });
    }
}

function _trafficTimeIndexReport(trafficTimeIndex) {
  if (trafficTimeIndex) {
    return Math.floor(trafficTimeIndex) + ' min on average.';
  }
  return 'No data found.';
}

CityProfile.defaultProps = {
  cityReport: [],
  cityMeta: {}
};

CityProfile.propTypes = {
  cityReport: React.PropTypes.array,
  cityMeta: React.PropTypes.object.isRequired
};

export default CityProfile;
