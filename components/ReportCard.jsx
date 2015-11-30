'use strict';

import React from 'react';

import MapPreview from '../components/MapPreview';
import ColorCube from '../components/ColorCube';
import RadarChartReport from '../components/RadarChartReport';
import ReportCardSummary from '../components/ReportCardSummary';

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
        <div className='report-card__chart'>
          <RadarChartReport
            reports={[this.props.fromReport, this.props.toReport]} />
        </div>
        <div>
          <span style={{marginRight: '15px'}}>
            <ColorCube legend={this.props.from.city} classes='bkg--blue' />
          </span>
          <ColorCube legend={this.props.to.city} classes='bkg--purple' />
        </div>
      </div>
    );
  }

  // yeha, I know...
  _renderCubes(report) {
    return report.concat().sort((a, b) => {
      if (a.className === b.className) {
        return 0;
      } else {
        return (a.sortOrder > b.sortOrder) ? 1 : -1;
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

function _compare(a, b) {
  return ((1 - (a / b)) * 100).toPrecision(3);
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
