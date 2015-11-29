'use strict';

import React from 'react';

class EmoticonReportTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'emoticon-report-tile' + ' ' + this.props.customClasses}>
        <i className={'fa ' + this.props.icon + ' emoticon-report-tile__emote'}></i>
        <div>
          <h3>{this.props.title} ({Math.floor(this.props.rating)})</h3>
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
