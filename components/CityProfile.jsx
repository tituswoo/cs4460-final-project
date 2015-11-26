'use strict';

import React from 'react';

class CityProfile extends React.Component {
    render() {
      console.log(this.props.city);
      if (!this.props.city ||
        !this.props.city.city_crime ||
        !this.props.city.city_healthcare ||
        !this.props.city.city_traffic ||
        !this.props.city.indices) {
        return (<div />);
      }
      return (
        <div className='city-profile'>
          <h3>{this.props.city.indices.name}</h3>
        </div>
      );
    }
}

CityProfile.defaultProps = {
  city: []
};

CityProfile.propTypes = {
  city: React.PropTypes.array
};

export default CityProfile;
