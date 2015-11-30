'use strict';

import React from 'react';
import ColorCube from '../components/ColorCube';

class ReportCardSummary extends React.Component {
  render() {
    /*let reports = this.props.reports;
    let qualityPreposition = reports.quality_of_life > 0 ? 'better' : 'worse';
    let safetyPreposition = this.state.comparisons.safety_comparison > 0 ? 'safer' : 'sketchier';
    let costPreposition = this.state.comparisons.cost_of_living > 0 ? 'pricier' : 'cheaper';*/

    return (
      <div>
        <p>
          <ColorCube classes='bkg--blue' />
        </p>
      </div>
    );
  }
}

export default ReportCardSummary;
