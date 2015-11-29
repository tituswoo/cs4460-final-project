'use strict';

import React from 'react';
import environmentControlActions from '../actions/environmentControlActions';

class Explore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    environmentControlActions.blurMap(0);
    environmentControlActions.set('mapSaturation', 1);
    environmentControlActions.set('startOverButton', true);
    environmentControlActions.set('mapEnabled', true);
    environmentControlActions.set('mapShowDetailed', true);
  }

  componentWillUnmount() {
    environmentControlActions.reset();
  }

  render() {
    return (
      <div className='explore'></div>
    );
  }
}

export default Explore;
