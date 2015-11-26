'use strict';

import React from 'react';

class CityProfile extends React.Component {
    render() {
      console.log(this.props.city);
      // super ugly, try to find another way...
      if (!this.props.city ||
        !this.props.city.city_crime ||
        !this.props.city.city_healthcare ||
        !this.props.city.city_traffic ||
        !this.props.city.indices) {
        return (<div />);
      }
      return (
        <div className='city-profile'>
          <h2 className='city-profile__title'>{this.props.city.indices.name}</h2>

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
