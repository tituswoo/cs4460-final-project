'use strict';

import React from 'react';
import MapPreview from '../components/MapPreview';
import ColorCube from '../components/ColorCube';

class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  render() {
    return (
      <div className='report-card report-card--push-left'>
        <div className='report-card__maps'>
          <div className='report-card__vs'>
            <p>vs</p>
          </div>
          <MapPreview
            title={_abbreviate(this.props.from.city)}
            subtitle={this.props.from.country}
            latitude={this.props.from.latitude}
            longitude={this.props.from.longitude}>
            <div className='report-card__color-cubes'>
              <ColorCube color='red' />
              <ColorCube color='green' />
              <ColorCube color='blue' />
            </div>
          </MapPreview>
          <MapPreview
            title={_abbreviate(this.props.to.city)}
            subtitle={this.props.to.country}
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
  to: {},
  fromCity: [],
  toCity: []
};

ReportCard.propTypes = {
  from: React.PropTypes.object.isRequired,
  to: React.PropTypes.object.isRequired,
  fromCity: React.PropTypes.array.isRequired,
  toCity: React.PropTypes.array.isRequired,
};

export default ReportCard;
