'use strict';

import React from 'react';
import {Radar as RadarChart} from 'react-chartjs';

/**
 * Assume that all the reports have the same number of elements.
 */
class RadarChartReport extends React.Component {
  constructor(props) {
    super(props);
  }

  _getReportRatings(report) {
    return report.map((cat) => {
      return cat.rating;
    });
  }

  _getReportLabels(report) {
    let labels = report.map((cat) => {
      return cat.name;
    });
    console.log(labels);
    return labels;
  }

  _getReportDatasets(reports) {
    let datasets = [];
    reports.map((report) => {
      datasets.push({
        label: 'Dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: this._getReportRatings(report)
      });
    });
    return datasets;
  }

  _getChartDataFrom(reports) {
    return {
      labels: this._getReportLabels(reports[0]),
      datasets: this._getReportDatasets(reports)
    };
  }

  render() {
    if (this.props.reports.length <= 0) {
      console.log('not ready yet...');
      return (<div />);
    }

    console.log(this._getChartDataFrom(this.props.reports));

    return (
      <RadarChart
        data={this._getChartDataFrom.call(this, this.props.reports)}
        options={{
          scaleOverride: false
        }}/>
    );
  }
}

RadarChartReport.propTypes = {
  reports: React.PropTypes.array.isRequired
};

export default RadarChartReport;
