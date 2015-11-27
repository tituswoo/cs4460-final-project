'use strict';

import React from 'react';

class LoadingDialog extends React.Component {
  render() {
    return (
      <div className='loading-dialog'>
        <h1>
          <i className='fa fa-spin fa-circle-o-notch'></i> Loading..
          </h1>
      </div>
    );
  }
}

export default LoadingDialog;
