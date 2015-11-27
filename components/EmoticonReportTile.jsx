'use strict';

import React from 'react';

class EmoticonReportTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='emoticon-report-tile'>
        <i className={'fa ' + this._pickIconToUse() + ' emoticon-report-tile__emote'}></i>
        <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.remark || this.state.remark}</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._pickRemarkAndEmote(this.props.scale, this.props.rating);
  }

  _pickIconToUse() {
    return this.props.icon || this.state.icon;
  }

  _pickRemarkAndEmote(scale, rating) {
    if (scale.length < 1) {
      this.setState({
        remark: 'No scale defined.',
        icon: 'fa-question-circle'
      });
    } else {
      for (let i = 0; i < scale.length; i++) {
        if (rating >= scale[i].from && rating <= scale[i].to) {
          this.setState({
            remark: scale[i].remark + '.',
            icon: scale[i].icon
          });
          return;
        }
      }
      this.setState({
        remark: 'Unknown.',
        icon: 'fa-question-circle'
      });
    }
  }
}

EmoticonReportTile.propTypes = {
  title: React.PropTypes.string,
  rating: React.PropTypes.number,
  scale: React.PropTypes.array,
  remark: React.PropTypes.string,
  icon: React.PropTypes.string
};

EmoticonReportTile.defaultProps = {
  title: 'Title here',
  rating: 0,
  scale: []
};

export default EmoticonReportTile;
