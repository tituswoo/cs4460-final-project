'use strict';

import React from 'react';

class EmoticonReportTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  _min(a, b) {
    return a < b ? a : b;
  }

  render() {
    return (
      <div
        className={'emoticon-report-tile' + ' ' + this.props.customClasses}
        onMouseOver={() => this.setState({isHovering: true})}
        onMouseOut={() => this.setState({isHovering: false})}>
        <div className='emoticon-report-tile__mini-chart'
          style={{
            width: this.state.isHovering ? this._min(this.props.rating, 100) + '%' : '0',
            opacity: this.state.isHovering ? '1' : '0'
          }}>
          <div className='value'>{Math.floor(this.props.rating)}</div>
        </div>
        <i className={'fa ' + this.props.icon + ' emoticon-report-tile__emote'}></i>
        <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.remark}</p>
        </div>
      </div>
    );
  }
}

EmoticonReportTile.propTypes = {
  title: React.PropTypes.string,
  rating: React.PropTypes.number,
  scale: React.PropTypes.array,
  remark: React.PropTypes.string,
  icon: React.PropTypes.string,
  customClasses: React.PropTypes.string
};

EmoticonReportTile.defaultProps = {
  title: 'Title here',
  rating: 0,
  scale: [],
  customClasses: ''
};

export default EmoticonReportTile;
