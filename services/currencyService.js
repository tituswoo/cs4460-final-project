'use strict';

function currencyService() {
  return {
    formatAsCurrency: function(value) {
      let strNum = String(value);
      let offset = strNum.length - 3;
      return '$' + strNum.substr(0, offset) + ',' + strNum.substr(offset, strNum.length);
    }
  };
}

export default currencyService();
