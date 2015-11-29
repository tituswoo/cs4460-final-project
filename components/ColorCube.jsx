'use strict';

import React from 'react';

class ColorCube extends React.Component {
  render() {
    return (
      <div className={'color-cube ' + this.props.classes}
        style={{color: this.props.color}} />
    );
  }
}

ColorCube.defaultProps = {
  text: '',
  color: 'black',
  tooltip: '',
  classes: ''
};

ColorCube.propTypes = {
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  classes: React.PropTypes.string
};

export default ColorCube;
