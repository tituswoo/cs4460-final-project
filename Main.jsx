'use strict';

import React from 'react';

/**
 * Yes I know this is is a sucky name,
 * but for now getting things done > good looking code.
 */
class Main extends React.Component {
  render() {
    return (
      <div className='Main'>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
