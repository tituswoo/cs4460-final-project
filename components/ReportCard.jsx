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
              {this._renderCubes(this.props.fromReport)}
            </div>
          </MapPreview>
          <MapPreview
            title={_abbreviate(this.props.to.city)}
            subtitle={this.props.to.country}
            latitude={this.props.to.latitude}
            longitude={this.props.to.longitude}>
            <div className='report-card__color-cubes'>
              {this._renderCubes(this.props.toReport)}
            </div>
          </MapPreview>
        </div>
        <h3>Test</h3>
      </div>
    );
  }

  // yeha, I know...
  _renderCubes(report) {
    return report.sort((a, b) => {
      if (a.className === b.className) {
        return 0;
      } else {
        return (a.className > b.className) ? 1 : -1;
      }
    }).map(function(cat) {
      return (
        <ColorCube key={cat.rating + cat.key}
           classes={cat.className}/>
      );
    });
  }
}

function _abbreviate(city) {
  return city.substr(0, 3).toUpperCase();
}

ReportCard.defaultProps = {
  from: {},
  to: {},
  fromReport: [],
  toReport: []
};

ReportCard.propTypes = {
  from: React.PropTypes.object.isRequired,
  to: React.PropTypes.object.isRequired,
  fromReport: React.PropTypes.array,
  toReport: React.PropTypes.array
};

export default ReportCard;
