'use strict';

import React from 'react';
import MapPreview from '../components/MapPreview';

class ReportCard extends React.Component {
  render() {
    return (
      <div className='report-card'>
        <div className='report-card__maps'>
          <div className='report-card__vs'>
            <p>vs</p>
          </div>
          <MapPreview
            title={_abbreviate(this.props.from.city)}
            latitude={this.props.from.latitude}
            longitude={this.props.from.longitude}/>
          <MapPreview
            title={_abbreviate(this.props.to.city)}
            latitude={this.props.to.latitude}
            longitude={this.props.to.longitude}/>
        </div>
        <h3>Test</h3>
      </div>
    );
  }
}

function _abbreviate(city) {
  return city.substr(0, 3).toUpperCase();
}

ReportCard.defaultProps = {
  from: {},
  to: {}
};

ReportCard.propTypes = {
  from: React.PropTypes.object.isRequired,
  to: React.PropTypes.object.isRequired
};

export default ReportCard;
