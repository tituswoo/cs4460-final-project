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
    return labels;
  }

  // my use case only has 2 things to compare, so really rn just hardcode this...
  // I know it isn't pretty :)
  _getReportDatasets(reports) {
    console.log(reports);
    let datasets = [];
    let count = 0;
    reports.map((report) => {
      datasets.push({
        label: 'Awesome dataset',
        fillColor: count % 2 ? 'rgba(255, 117, 230, 0.53)' : 'rgba(77, 154, 255, 0.51)',
        strokeColor: count % 2 ? 'rgba(255, 51, 218, 0.76)' : 'rgba(151,187,205,1)',
        pointColor: count % 2 ? 'rgba(255, 61, 219, 1)' : 'rgba(51, 139, 255, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: count % 2 ? 'rgba(220,220,220,1)' : 'rgba(151,187,205,1)',
        data: this._getReportRatings(report)
      });
      count += 1;
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
      return (<div />);
    }

    return (
      <RadarChart
        data={this._getChartDataFrom.call(this, this.props.reports)}
        options={{
          scaleOverride: false,
          responsive: true,
          pointLabelFontSize: 15
        }}/>
    );
  }
}

RadarChartReport.propTypes = {
  reports: React.PropTypes.array.isRequired
};

export default RadarChartReport;
