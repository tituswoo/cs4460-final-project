'use strict';

import React from 'react';

class CityProfile extends React.Component {
    render() {
      return (
        <div className='city-profile'>
          <h3>City Name here</h3>
          <h4>CITYID: {this.props.cityId}</h4>
        </div>
      );
    }
}

CityProfile.defaultProps = {
  cityId: ''
};

CityProfile.propTypes = {
  cityId: React.PropTypes.number
};

export default CityProfile;
