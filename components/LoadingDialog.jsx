'use strict';

import React from 'react';
let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class LoadingDialog extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName='generic-fade'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
        {
          <div key={1} className='loading-dialog'>
            <h1>
              <i className='fa fa-cog fa-spin'></i> Loading...
              </h1>
          </div>
        }
    </CSSTransitionGroup>
    );
  }
}

export default LoadingDialog;
