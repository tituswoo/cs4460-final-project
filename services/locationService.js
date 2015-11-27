'use strict';

function locationService() {
  return {
    /**
     * Normalizes a Numbeo city object and returns a string.
     *
     * @param  {city} city the numbeo city object
     * @return {string} the name of the city/location
     */
    normalize: function(city) {
      if (Object.keys(city).length < 1) {
        return '';
      }

      if (city.city.split(',').length < 2) {
        return city.city + ', ' + city.country;
      } else {
        return city.city;
      }
    }
  };
}

export default locationService();
