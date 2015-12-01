'use strict';

function currencyService() {
  return {
    formatAsCurrency: function(value) {
      let processed = String(Math.round(value)).split('');
      processed.splice(String(value).length - 3, 0, ',');
      processed = processed.join('');
      return '$' + processed;
    }
  };
}

export default currencyService();
