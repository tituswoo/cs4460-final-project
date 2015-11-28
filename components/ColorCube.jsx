'use strict';

import React from 'react';

class ColorCube extends React.Component {
  render() {
    return (
      <div className='color-cube'
        style={{color: this.props.color}} />
    );
  }
}

ColorCube.defaultProps = {
  text: '',
  color: 'black',
  tooltip: ''
};

ColorCube.propTypes = {
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  tooltip: React.PropTypes.string
};

export default ColorCube;
