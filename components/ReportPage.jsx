'use strict';

import React from 'react';

class ReportPage extends React.Component {
  render() {
    return (
      <div className='report-page'>
        <h2>Report Page</h2>
        <p>This is the reports page</p>
        {this.props.children}
      </div>
    );
  }
}

export default ReportPage;
