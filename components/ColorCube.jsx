'use strict';

import React from 'react';

class ColorCube extends React.Component {
  render() {
    if (this.props.legend) {
      return (
        <div style={{
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'left'
          }}>
          <span className={'color-cube ' + this.props.classes}
            style={{
              color: this.props.color,
              float: 'left',
              marginRight: '5px'
            }} />
          <span style={{fontSize: 11}}>{this.props.legend}</span>
        </div>
      );
    }

    return (
      <div className={'color-cube ' + this.props.classes}
        style={{color: this.props.color}}>
        {this.props.children}
      </div>
    );
  }
}

ColorCube.defaultProps = {
  text: '',
  color: 'black',
  tooltip: '',
  classes: '',
  legend: ''
};

ColorCube.propTypes = {
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  classes: React.PropTypes.string,
  legend: React.PropTypes.string
};

export default ColorCube;
