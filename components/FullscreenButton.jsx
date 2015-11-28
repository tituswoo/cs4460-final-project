'use strict';

import React from 'react';
import fullscreenService from '../services/fullscreenService';

/**
 * Sloppy fullscreen button control. You can make it show the wrong value
 * by just using chrome's "leave fullscreen mode" instead of clicking
 * on the button. But whatever, just to throw something in :D
 */
class FullscreenButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inFullscreen: false
    };
  }

  _toggleFullscreen() {
    if (this.state.inFullscreen) {
      fullscreenService.leave();
      this.setState({inFullscreen: false});
    } else {
      fullscreenService.launch();
      this.setState({inFullscreen: true});
    }
  }

  render() {
    return (
      <div className='fullscreen-button' onClick={this._toggleFullscreen.bind(this)}>
        {!this.state.inFullscreen &&
          <p><i className='fa fa-arrows-alt'></i> Fullscreen</p>
        }
        {this.state.inFullscreen &&
          <p><i className='fa fa-compress' style={{marginRight: 0}}></i></p>
        }
      </div>
    );
  }
}

export default FullscreenButton;
